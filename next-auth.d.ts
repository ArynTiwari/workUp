import { type DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
    role: string
}

declare module "next/auth" {
    interface Session {
        user: ExtendedUser
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "@auth/core/jwt";
declare module "@auth/core/jwt" {
    interface JWT {
        role: "CLIENT" | "FREELANCER" | "ADMIN"
    }
}