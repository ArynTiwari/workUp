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
        <body className="flex flex-col items-center justify-center">
          <div className="container sm:p-4 md:p-7 lg:p-10">
            <Navbar />
            <div>
              {children}
            </div>
          </div>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
