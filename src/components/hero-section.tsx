import React from "react"
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
export const HeroSection = () => {
    return (
        <>
            <section className="hero-section p-2">
                <div className="grid items-center gap-1 lg:grid-cols-2">
                    {/* Left Section */}
                    <div className="h-full flex flex-col items-start justify-center text-left space-y-4">
                        {/* New Releases Link */}
                        <div className="flex flex-row items-center justify-start">
                            <div><Link href="#">New Releases</Link></div>
                            <div><ArrowUpRight size={14} /></div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-left text-xl font-bold lg:text-4xl">
                            Welcome to Your WorkPlace!
                        </h1>

                        {/* Description for Workup */}
                        <p className="max-w-xl text-muted-foreground lg:text-xl">
                            Workup is the perfect platform for freelancers and businesses to connect, collaborate, and achieve great results. Join a thriving community and get your projects done effortlessly.
                        </p>

                        {/* Buttons for FAQ and Explore */}
                        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                            <Button className="w-full sm:w-auto">
                                <ArrowRight className="mr-2 size-4" />
                                FAQ
                            </Button>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Explore
                            </Button>
                        </div>
                    </div>

                    {/* Right Section with Images */}
                    <div className="relative aspect-[3/4]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 800 800"
                                className="size-full text-muted-foreground opacity-20"
                            >
                                {Array.from(Array(720).keys()).map((dot, index, array) => {
                                    const angle = 0.2 * index;
                                    const scalar = 40 + index * (360 / array.length);
                                    const x = Math.round(Math.cos(angle) * scalar);
                                    const y = Math.round(Math.sin(angle) * scalar);

                                    return (
                                        <circle
                                            key={index}
                                            r={(3 * index) / array.length}
                                            cx={400 + x}
                                            cy={400 + y}
                                            opacity={1 - Math.sin(angle)}
                                        />
                                    );
                                })}
                            </svg>
                        </div>

                        {/* First Image */}
                        <div className="image-container absolute left-[8%] top-[10%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent">
                            <img
                                src="https://media.istockphoto.com/id/1221892478/vector/web-development-website-programming-and-coding-the-woman-is-working-on-the-backend-in-ide-on.jpg?s=612x612&w=0&k=20&c=-r9kvSDwqq8dHyAhVv6f2XVic0aHQNdcsh-PyllOLn4="
                                alt="Explore Opportunities"
                                className="w-full rounded-md object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>

                        {/* Second Image */}
                        <div className="image-container absolute right-[12%] top-[20%] flex aspect-square w-1/5 justify-center rounded-lg border border-border bg-accent">
                            <img
                                src="https://media.gettyimages.com/id/1778530904/vector/ai-chat-concept-chatbot-customer-service.jpg?s=612x612&w=0&k=20&c=Qkqtdb-RzLyBRvpr7jGcTNM3avI3EnAh5T_E5bJvfiQ="
                                alt="AI Chat"
                                className="w-full rounded-md object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>

                        {/* Third Image */}
                        <div className="image-container absolute bottom-[24%] right-[24%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent">
                            <img
                                src="https://media.istockphoto.com/id/1498815235/vector/programmer-woman-sitting-on-cloud-computing-symbol-and-process-coding-for-software.jpg?s=612x612&w=0&k=20&c=dx17U_srS4aPDx0IqVAQHn1UP2UEoTjOjUjlx4Ni_mM="
                                alt="Cloud Computing"
                                className="w-full rounded-md object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
  .image-container {
    margin: 20px; /* Adds more space between images */
  }
  .image-container img {
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }
  .image-container img:hover {
    transform: scale(1.1); /* Zoom effect on hover */
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
  }
`}</style>
        </>
    )
}
