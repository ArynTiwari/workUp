import { DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
    role: "CLIENT" | "FREELANCER" | "ADMIN",
    isBoarded: boolean
}
declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

export interface FormData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}   