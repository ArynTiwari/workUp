import { Gender } from "@prisma/client";

export interface User {
    id?: string | undefined;
    name?: string | null;
    email?: string | undefined;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
    role?: string | undefined;
    isEmailVerified?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    isVerified?: boolean | undefined;
    isBoarded?: boolean | undefined;
    profile?: {
        id: string; userName: string | null; bio: string | null; gender: Gender | null; skills: string[]; zip: number | null; city: string | null; state: string | null; userId: string;
    } | null | undefined
}
