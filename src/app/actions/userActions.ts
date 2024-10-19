"use server";
import { blogSchema, onboardSchema, projectSchema } from '@/lib/zod';
import prisma from '@/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const updateUserProfile = async (values: z.infer<typeof onboardSchema>, id: string) => {
    // Validate the incoming data using the onboardSchema
    const validatedFields = onboardSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            issues: validatedFields.error.format(),
        };
    }

    // Destructure the validated fields
    const {
        userName, bio, gender, age, phoneNumber, password, role, skills, currentWorkExperience,
        previousWorkExperience, highestEducation, currentJob, userStatus, zip, city, state, linkedin,
        github, twitter, hourlyRate, freelancingPreferences
    } = validatedFields.data;

    // Check for a valid ID
    if (!id) {
        return {
            error: "Invalid login, please try again!",
        };
    }

    // Prepare the data for updating the user profile
    const updateData = {
        role,
        isBoarded: true,
        updatedAt: new Date(),
        password,
        profile: {
            upsert: {
                create: {
                    userName,
                    bio,
                    gender,
                    age: age ? Number(age) : undefined,  // Ensure age is stored as a number
                    phoneNumber: phoneNumber ? Number(phoneNumber) : undefined,  // Store phone number as a number
                    skills: skills || [],  // Ensure skills is an array
                    currentWorkExperience,
                    previousWorkExperience: previousWorkExperience || [], // Default to empty array
                    highestEducation,
                    currentJob,
                    userStatus,
                    zip: zip ? Number(zip) : undefined,  // Ensure zip is stored as a number
                    city,
                    state,
                    linkedin,
                    github,
                    twitter,
                    hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,  // Store hourlyRate as a number
                    freelancingPreferences
                },
                update: {
                    userName,
                    bio,
                    gender,
                    age: age ? Number(age) : undefined,  // Ensure age is stored as a number
                    phoneNumber: phoneNumber ? Number(phoneNumber) : undefined,  // Store phone number as a number
                    skills: skills || [],  // Ensure skills is an array
                    currentWorkExperience,
                    previousWorkExperience: previousWorkExperience || [], // Default to empty array
                    highestEducation,
                    currentJob,
                    userStatus,
                    zip: zip ? Number(zip) : undefined,  // Ensure zip is stored as a number
                    city,
                    state,
                    linkedin,
                    github,
                    twitter,
                    hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,  // Store hourlyRate as a number
                    freelancingPreferences
                },
            },
        },
    };

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        return {
            error: "User not found",
        };
    }

    // Hash password if provided and update the password field
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword; // Update the password field
    }

    try {
        // Perform the update in the database using Prisma
        await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return {
            success: true,
            message: "Profile updated successfully",
        };
    } catch (error) {
        console.error("Error updating profile:", error);
        return {
            error: "Failed to update profile. Please try again later.",
        };
    }
}

export async function findUser(id: string) {
    return await prisma.profile.findUnique({
        where: {
            userId: id
        }
    })
}
export async function getUserById(id: string) {
    return await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            blogs: true,
            profile: true,
            projects: true,
            comments: true
        }
    })
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            blogs: true,
            projects: true,
            comments: true
        }
    })
}

export async function createBlog(values: z.infer<typeof blogSchema>, id: string) {
    const validatedFields = blogSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            issues: validatedFields.error.format(),
        };
    }
    const { title, content } = validatedFields.data;
    try {
        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: id,
                createdAt: new Date(),
            },
        });
        return {
            success: true,
            message: "Blog created successfully",
            data: newBlog,
        };
    } catch (error) {
        console.error("Error creating blog:", error);
        return {
            error: "Failed to create blog. Please try again later.",
        };
    }
}
export async function createProject(values: z.infer<typeof projectSchema>, id: string) {
    const validatedFields = projectSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            issues: validatedFields.error.format(),
        };
    }
    const { title, description, budget, paymentType } = validatedFields.data;
    try {
        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                budget,
                paymentType,
                clientId: id,
                createdAt: new Date(),
            },
        });
        return {
            success: true,
            message: "Project created successfully",
            data: newProject,
        };
    } catch (error) {
        console.error("Error creating Project:", error);
        return {
            error: "Failed to create Project. Please try again later.",
        };
    }
}

import { getVerificationTokenByToken } from '@/lib/verification-token';
export async function newVerification(token: string) {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return {
            error: "Invalid token",
        };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {
            error: "Token has expired",
        };
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingToken) {
        return {
            error: "Email not found",
        };
    }
    await prisma.user.update({
        where: {
            id: existingUser?.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });
    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });
    return {
        success: "Email Verified!"
    };
}