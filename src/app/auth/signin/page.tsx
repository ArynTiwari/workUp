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
import { handleGitHubSignIn } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { loginUser } from "@/app/actions/registerActions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading-spinner";
import React from "react";

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
        <>
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
                    <div className="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
                        <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
                            Solving problems for every{" "}
                            <span className="text-blue-600 dark:text-blue-500">team</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 dark:text-neutral-500">
                            Built on standard web technology, teams use Preline to build beautiful
                            cross-platform hybrid apps in a fraction of the time.
                        </p>

                        <div className="py-6 flex items-center text-sm text-gray-400 uppercase before:flex-1 before:border-t before:me-6 after:flex-1 after:border-t after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">
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

                                <form className="w-full" action={handleGitHubSignIn}>
                                    <Button variant="outline" className="w-full" type="submit">
                                        <DiscordLogoIcon className="h-4 w-4 mr-2" />
                                        Sign in with Discord
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full items-center justify-center bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-center bg-cover" />
            </div>
        </>
    );
}
