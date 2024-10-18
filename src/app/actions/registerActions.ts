"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { generateVerificationToken } from "@/lib/tokens";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sendEmailVerification } from "@/lib/mail";
export const registerUser = async (values: z.infer<typeof signUpSchema>) => {
    const validatedFields = signUpSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
        };
    }
    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return {
            error: "User already exists! Try logging in instead.",
        };
    }
    try {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const verificationToken = await generateVerificationToken(email);
        await sendEmailVerification(verificationToken.email, verificationToken.token);
        return {
            success: "User registered successfully",
        };
    } catch (error) {
        return {
            error: error,
        };
    }
};

export const loginUser = async (values: z.infer<typeof signInSchema>) => {
    const validatedFields = signInSchema.safeParse(values);

    // Validate the input fields
    if (!validatedFields.success) {
        return {
            error: {
                title: "Invalid fields",
                description: "Please try again with valid credentials."
            },
        };
    }

    const { email, password } = validatedFields.data;
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: {
                title: "Email does not exists!",
                description: "Please try again with a valid email address."
            },
        };
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendEmailVerification(verificationToken.email, verificationToken.token);
        return {
            error: {
                title: "Email not verified!",
                description: "Please check your email for a verification link."
            },
        };
    }
    try {
        // Perform the credentials sign-in
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // Ensure it doesn't redirect automatically
        });

        if (!res || res.error) {
            return {
                error: res.error || "Invalid email or password",
            };
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // Generate a token (or fetch the one you need)
        const token = await generateVerificationToken(email);  // Replace with your token logic

        // Return the success response with user and token
        return {
            success: {
                title: "Login successful",
                description: "Taking you to the dashboard!"
            },
            user: user,  // Returning the logged-in user
            token,
        };

    } catch (error) {
        // Handle errors during authentication
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: {
                            title: "Invalid email or password",
                            description: "Please try again with valid credentials."
                        },
                    };
                default:
                    return {
                        error: {
                            title: "Something went wrong!",
                            description: "Please try again later."
                        },
                    };
            }
        }
        throw error;
    }
};