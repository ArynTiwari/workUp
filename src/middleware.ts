import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, publicRoutes } from "../route";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth: middleware } = NextAuth(authConfig)
export default middleware((req): NextResponse => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isApiAuthRoute) {
        return NextResponse.next();
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
        return NextResponse.next();
    }
    if (!isLoggedIn && !isPublicRoute) {
        console.log("Redirecting to signin from middleware");
        return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
    return NextResponse.next();
})



export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
