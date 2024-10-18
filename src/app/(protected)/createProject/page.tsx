"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { projectSchema } from "@/lib/zod";
import { createProject } from "@/app/actions/userActions";
import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoadingButton from "@/components/loading-button";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

export default function CreateProject() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            budget: undefined,
            paymentType: undefined,
        },
    });
    const [isPending, startTransition] = useTransition();

    async function onSubmit(values: z.infer<typeof projectSchema>) {
        console.log("Submitting form...");
        console.log("Form values:", values);

        if (!session) {
            toast({
                title: "Error",
                description: "You need to be logged in to create a project.",
            });
            return;
        }

        const authorId = session.user.id; // Ensure `id` is correctly obtained from session

        startTransition(() => {
            createProject(values, authorId as string)
                .then((response) => {
                    if (response.success) {
                        toast({
                            title: "Project created successfully!",
                            description: "Your project has been created.",
                        });
                        router.push("/profile"); // Redirect after success
                    } else {
                        toast({
                            title: "Error",
                            description: response.error,
                        });
                    }
                })
                .catch((err) => {
                    console.error("Create project failed", err);
                    toast({
                        title: "Error",
                        description: "Failed to create project. Please try again.",
                    });
                });
        });
    }

    return (
        <div className="grow flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Create Your Project Here!
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
                                            <Input placeholder="Project Title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Give your project a title.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project Description" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Write about your project.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Budget"
                                                disabled={isPending}
                                                value={field.value || ""} // Keep it as string
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Convert to number if it's a valid number string
                                                    const numericValue = value ? Number(value) : undefined;
                                                    // Update the field with the numeric value (or undefined)
                                                    field.onChange(numericValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="paymentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="one-time basis" id="one-time-basis" />
                                                    <Label htmlFor="one-time-basis">One-Time Basis</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="monthly basis" id="monthly-basis" />
                                                    <Label htmlFor="monthly-basis">Monthly Basis</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="work-progress basis" id="work-progress-basis" />
                                                    <Label htmlFor="work-progress-basis">Work Progress Basis</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton pending={isPending}>
                                Submit
                            </LoadingButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
