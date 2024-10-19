"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import { handleDiscordSignIn, handleGoogleSignIn } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { loginUser } from "@/app/actions/registerActions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading-spinner";
import React from "react";
import Image from "next/image";
export default function SignInWithHero() {
    const { data: session, update } = useSession();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false); // For loading state

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        startTransition(async () => {
            setLoading(true);
            const res = await loginUser(data);
            setLoading(false);
            if (res.success) {
                toast({
                    title: "Login successful!",
                    description: "Taking you to the homepage!",
                });
                update({ user: { ...session?.user } });
                setTimeout(() => {
                    router.push(session?.user?.role === "ADMIN" ? "/admin" : "/");
                }, 3000);
            } else {
                toast({
                    title: res.error.title,
                    description: res.error.description,
                });
            }
        });
    };

    if (loading || isPending) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 px-4">
            {/* Left Column: Form Section */}
            <div className="md:w-1/2 lg:w-5/12">
                <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
                    Solving problems for every{" "}
                    <span className="text-blue-600 dark:text-blue-500">team</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-neutral-500">
                    Built on standard web technology, teams use Preline to build beautiful
                    cross-platform hybrid apps in a fraction of the time.
                </p>

                <div className="py-6 flex items-center text-sm text-gray-400 uppercase before:flex-1 before:border-t before:mr-6 after:flex-1 after:border-t after:ml-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">
                    Or
                </div>

                {/* Sign-In Form */}
                <Card className="bg-white shadow-2xl rounded-lg p-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Welcome Back
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email Input */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    autoComplete="off"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Input */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <LoadingButton pending={form.formState.isSubmitting}>
                                    Sign in
                                </LoadingButton>
                            </form>
                        </Form>

                        <span className="text-sm text-gray-500 text-center block my-2">or</span>

                        {/* Discord Sign-In */}
                        <form className="w-full" action={handleDiscordSignIn}>
                            <Button variant="outline" className="w-full" type="submit">
                                <DiscordLogoIcon className="h-4 w-4 mr-2" />
                                Sign in with Discord
                            </Button>
                        </form>

                        {/* Google Sign-In */}
                        <form className="w-full mt-2" action={handleGoogleSignIn}>
                            <Button variant="outline" className="w-full" type="submit">
                                <DiscordLogoIcon className="h-4 w-4 mr-2" />
                                Sign in with Google
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Image Section (Visible on md and above) */}
            <div className="hidden md:block md:w-1/2 lg:w-7/12">
                <Image
                    src={'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80'}
                    alt="Workup"
                    width={700}
                    height={900}
                    className="rounded-lg"
                />
            </div>
        </div>

    );
}
