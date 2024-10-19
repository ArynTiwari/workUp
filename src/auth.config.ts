import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";
import prisma from "@/prisma";
import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";
export default {
    providers: [
        Google,
        Discord,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                const parsedCredentials = signInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials:", parsedCredentials.error.errors);
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user || !user.password) {

                    return null;
                }
                const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password);
                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        })
    ],
} satisfies NextAuthConfig;