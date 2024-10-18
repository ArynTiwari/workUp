import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email address",
        html: `<p>Please verify your email address by clicking the link below:</p>
        <p><a href="${confirmLink}">${confirmLink}</a></p>
        <p>If you did not request this email, please ignore this message.</p>`,
    });
};