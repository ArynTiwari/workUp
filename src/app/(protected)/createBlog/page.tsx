"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { blogSchema } from "@/lib/zod";
import { createBlog } from "@/app/actions/userActions";
import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function BlogForm() {
    const { data: session } = useSession();
    const authorId = session?.user?.id;
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });
    const [isPending, startTransition] = useTransition();
    function onSubmit(values: z.infer<typeof blogSchema>) {
        startTransition(() => {
            createBlog(values, authorId!)
                .then((response) => {
                    if (response.success) {
                        toast({
                            title: "Blog created successfully!",
                            description: "Please check your email for a verification link."
                        });
                        router.push("/profile");
                    } else {
                        toast({
                            title: "Error",
                            description: response.error,
                        });
                    }
                })
                .catch((err) => {
                    console.error("Create blog failed", err);
                    toast({
                        title: "Error",
                        description: "Failed to create blog. Please try again.",
                    });
                });
        });
    }
    return (
        <div className="grow flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Create Your Blog Here!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Give your blog a title.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="description" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Write about your blog.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending}>Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )

}