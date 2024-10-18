import NextAuth from "next-auth";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./app/actions/userActions";
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role as string;
                token.isBoarded = user.isBoarded as boolean;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session.user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as "ADMIN" | "CLIENT" | "FREELANCER";
            session.user.isBoarded = token.isBoarded as boolean;
            return session;
        },
        async authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            const role = auth?.user.role || 'user';
            console.log("Inside authorized user is:->", auth?.user);
            const isBoarded = auth?.user.isBoarded || false;
            //Actions to be performed when user is logged in and is not a boarded user
            if (pathname.startsWith('/auth/signin') && isLoggedIn && !isBoarded) {
                console.log("Redirecting to onboard!");
                return Response.redirect(new URL('/onboard', nextUrl));
            }
            if (pathname.startsWith("/admin") && role !== "ADMIN") {
                return Response.redirect(new URL('/', nextUrl));
            }
            if (!isBoarded) {
                return Response.redirect(new URL('/onboard', nextUrl));
            }
            return !!auth;
        },
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') {
                return true;
            }
            const existingUser = await getUserById(user.id as string);
            if (!existingUser?.emailVerified) {
                return false
            }
            return true;
        },

    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        },
    },
    pages: {
        signIn: "/auth/signin",
        newUser: "/onboard",
        error: "/auth/error"
    },
    ...authConfig
})