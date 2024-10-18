"use server";
import { signIn, signOut } from "@/auth";
const handleSingnIn = async () => {
    await signIn();
};

const handleSignOut = async () => {
    await signOut();
};
const handleGitHubSignIn = async () => {
    await signIn("discord", { redirectTo: "/" });
};
const handleGoogleSignIn = async () => {
    await signIn("google", { redirectTo: "/" });
};
export async function handleCredentialsSignin({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // Ensure it's false to handle manually in client
        });

        // If signIn returns an error
        if (res?.error) {
            // Handle specific errors from next-auth
            if (res.error === "CredentialsSignin") {
                return {
                    success: false,
                    message: "Invalid email or password. Please try again.",
                };
            } else {
                return {
                    success: false,
                    message: "An unexpected error occurred. Please try again.",
                };
            }
        }

        // Successful login
        if (res?.ok && !res.error) {
            return {
                success: true,
                message: "Login successful!",
            };
        }

        // Catch any other undefined scenarios
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    } catch (error) {
        // Handle unknown errors
        return {
            success: false,
            message: "An error occurred during the sign-in process.",
            error: error,
        };
    }
}
export { handleSingnIn, handleSignOut, handleGitHubSignIn, handleGoogleSignIn };