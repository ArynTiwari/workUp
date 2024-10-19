import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: 'Workup | Freelancing Marketplace for Professionals',
  description: 'Workup is a platform where freelancers can find jobs, connect with clients, and grow their careers.',
  openGraph: {
    title: 'Workup | Freelancing Marketplace for Professionals',
    description: 'Join Workup to connect with clients, find freelance jobs, and grow your business.',
    url: 'https://workup.com/',
    siteName: 'Workup'
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <SessionProvider>
        <body className="flex flex-col container mx-auto items-center justify-center">
          <div className="sm:mx-5 md:mx-10 lg:mx-20 sm:p-4 md:p-6 lg:p-10">
            <Navbar />
            {children}
          </div>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
