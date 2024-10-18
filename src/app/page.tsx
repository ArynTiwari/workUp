/* eslint-disable react/no-unescaped-entities */
"use client";
import { HeroSection } from "@/components/hero-section";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Footer from "@/components/footer-section";
import TeamsSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();
  useEffect(() => {
    if (session?.user && !session.user.isBoarded) {
      router.push("/onboard");
    }
  }, [session, router])
  return (
    <>
      <HeroSection />
      <TeamsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
