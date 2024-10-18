"use client"
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { registerUser } from "@/app/actions/registerActions";

// Validation schema
const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password confirmation must match" }),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the Terms and Conditions",
    }),
});

export default function Signup() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false,
        },
    });

    const [isPending, startTransition] = useTransition();
    const onSubmit = (data: z.infer<typeof signUpSchema>) => {
        startTransition(() => {
            registerUser(data).then((response) => {
                if (response.success) {
                    toast({
                        title: "Registration successful!",
                        description: "Please check your email for a verification link.",
                    });
                    setTimeout(() => {
                        router.push("/auth/signin");
                    }, 3000);
                } else {
                    toast({
                        title: "Error",
                        description: response.error as React.ReactNode,
                    });
                }
            });
        });
    };

    return (
        <div className="flex h-screen">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <p className="inline-block text-md font-medium bg-clip-text text-gray-700 dark:from-blue-400 dark:to-violet-400">
                            WorkUp IN: A vision for 2024
                        </p>
                        <div className="mt-4 md:mb-12 max-w-2xl">
                            <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-neutral-200">
                                Fully customizable rules to match your unique needs
                            </h1>
                            <p className="text-gray-600 dark:text-neutral-400">
                                We provide you with a test account that can be set up in seconds.
                                Our main focus is getting responses to you as soon as we can.
                            </p>
                        </div>
                        <blockquote className="hidden md:block relative max-w-sm">
                            <div className="relative z-10">
                                <p className="text-xl italic text-gray-800 dark:text-white">
                                    Amazing people to work with. Very fast and professional partner.
                                </p>
                            </div>
                            <footer className="mt-3">
                                <div className="flex items-center gap-x-4">
                                    <div className="shrink-0">
                                        <Image
                                            className="size-12 rounded-full"
                                            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                            alt="Avatar"
                                            width={320}
                                            height={320}
                                        />
                                    </div>
                                    <div className="grow">
                                        <div className="font-semibold text-gray-800 dark:text-neutral-200">
                                            Aryan Tiwari
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-neutral-500">
                                            Director WorkUp
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </blockquote>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-800">
                                    Start your free trial
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
                                                            placeholder="Enter your password"
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
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Confirm your password"
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
                                            name="termsAccepted"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={(checked) => field.onChange(checked)}
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        I accept the{" "}
                                                        <a
                                                            className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                                                            href="#"
                                                        >
                                                            Terms and Conditions
                                                        </a>
                                                    </FormLabel>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isPending} className="w-full">
                                            Get started
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
