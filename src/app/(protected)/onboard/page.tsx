"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { onboardSchema } from "@/lib/zod"; // Ensure this schema matches your updated requirements
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import { updateUserProfile } from "@/app/actions/userActions";
import { useRouter } from 'next/navigation';
import React from "react";

export default function SignIn() {
    const { data: session, update } = useSession();
    const id = session?.user?.id;
    const { toast } = useToast();
    const form = useForm<z.infer<typeof onboardSchema>>({
        resolver: zodResolver(onboardSchema),
        defaultValues: {
            userName: "",
            bio: "",
            gender: undefined,
            age: undefined,
            phoneNumber: undefined,
            password: "",
            confirmPassword: "",
            role: undefined,
            skills: [],
            currentWorkExperience: "",
            previousWorkExperience: [],
            highestEducation: "",
            currentJob: "",
            userStatus: undefined,
            zip: undefined,
            city: "",
            state: "",
            linkedin: "",
            github: "",
            twitter: "",
            hourlyRate: undefined,
            freelancingPreferences: undefined,
        },
    });
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: z.infer<typeof onboardSchema>) => {
        console.log(data)
        startTransition(() => {
            updateUserProfile(data, id!)
                .then(async (response) => {
                    if (response.success) {
                        toast({
                            title: "Update successful!",
                            description: "Please check your email for a verification link."
                        });
                        if (session?.user) {
                            await update({ user: { ...session.user, isBoarded: true } })
                                .then(() => {
                                    router.push("/profile");
                                })
                                .catch((err) => {
                                    console.error("Session update failed", err);
                                    toast({
                                        title: "Error",
                                        description: "Session update failed. Please try again.",
                                    });
                                });
                        }
                    } else {
                        toast({
                            title: "Error",
                            description: response.error,
                        });
                    }
                })
                .catch((err) => {
                    console.error("Update user profile failed", err);
                    toast({
                        title: "Error",
                        description: "Failed to update profile. Please try again.",
                    });
                });
        });
    };

    return (
        <div className="grow flex items-center justify-center p-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Please provide your information!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/**For username */}
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your username (required)"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For bio */}
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="About yourself!"
                                                autoComplete="off"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For password */}
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
                            {/**For confirm password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password again!"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For gender */}
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Label htmlFor="gender">Select Your Gender</Label>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="MALE" id="MALE" />
                                                        <Label htmlFor="MALE">Male</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="FEMALE" id="FEMALE" />
                                                        <Label htmlFor="FEMALE">Female</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="OTHER" id="OTHER" />
                                                        <Label htmlFor="OTHER">Other</Label>
                                                    </div>
                                                </RadioGroup>
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For phone number */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Phone number (optional"
                                                disabled={isPending}
                                                value={field.value} // Ensure value is numeric
                                                onChange={(e) => {
                                                    const value = e.target.value; // Get the input value as string
                                                    const numericValue = value ? Number(value) : 0; // Convert to number or set to 0 if empty
                                                    field.onChange(numericValue); // Pass the numeric value to onChange
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For age */}
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Your age (required in numbers)"
                                                disabled={isPending}
                                                value={field.value} // Ensure value is numeric
                                                onChange={(e) => {
                                                    const value = e.target.value; // Get the input value as string
                                                    const numericValue = value ? Number(value) : 0; // Convert to number or set to 0 if empty
                                                    field.onChange(numericValue); // Pass the numeric value to onChange
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For UserRole */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Label htmlFor="role">Select Your Role</Label>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="CLIENT" id="CLIENT" />
                                                        <Label htmlFor="CLIENT">Client</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="FREELANCER" id="FREELANCER" />
                                                        <Label htmlFor="FREELANCER">Freelancer</Label>
                                                    </div>
                                                </RadioGroup>
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For skills */}
                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Skills (comma-separated)"
                                                disabled={isPending}
                                                onChange={(e) => {
                                                    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
                                                    field.onChange(skillsArray); // Call field.onChange
                                                }}
                                                value={field.value!.join(', ')} // Display skills as comma-separated
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For previous work experience */}
                            <FormField
                                control={form.control}
                                name="previousWorkExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Previous Work Experience (comma-separated)"
                                                disabled={isPending}
                                                onChange={(e) => {
                                                    const previousExperienceArray = e.target.value.split(',').map(exp => exp.trim());
                                                    field.onChange(previousExperienceArray); // Call field.onChange
                                                }}
                                                value={field.value!.join(', ')} // Display previous experiences as comma-separated
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For highestEducation */}
                            <FormField
                                control={form.control}
                                name="highestEducation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Highest Education (required)"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For currentWorkExperience */}
                            <FormField
                                control={form.control}
                                name="currentWorkExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Current Job"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For freelancing preferences */}
                            <FormField
                                control={form.control}
                                name="freelancingPreferences"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Label htmlFor="userStatus">Select Your FreeLance Status</Label>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="ACTIVE" id="ACTIVE" />
                                                        <Label htmlFor="ACTIVE">Active</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="INACTIVE" id="INACTIVE" />
                                                        <Label htmlFor="INACTIVE">Inactive</Label>
                                                    </div>
                                                </RadioGroup>
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For zip */}
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Zip Code"
                                                disabled={isPending}
                                                value={field.value} // Keep it as string
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Convert to number if it's a valid number string
                                                    const numericValue = value ? Number(value) : '';
                                                    // Update the field with the numeric value (or an empty string)
                                                    field.onChange(numericValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For city */}
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="City"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For state */}
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="State"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For LinkedIn */}
                            <FormField
                                control={form.control}
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="LinkedIn Profile URL (optional)"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For GitHub */}
                            <FormField
                                control={form.control}
                                name="github"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="GitHub Profile UR (optional)"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For Twitter */}
                            <FormField
                                control={form.control}
                                name="twitter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="Twitter Profile URL (optional)"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For hourly rate */}
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Hourly Rate (required in Rupees)"
                                                disabled={isPending}
                                                value={field.value} // Ensure value is numeric
                                                onChange={(e) => {
                                                    const value = e.target.value; // Get the input value as string
                                                    const numericValue = value ? Number(value) : 0; // Convert to number or set to 0 if empty
                                                    field.onChange(numericValue); // Pass the numeric value to onChange
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/**For user status */}
                            <FormField
                                control={form.control}
                                name="userStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Label htmlFor="userStatus">Select Your Availablity Status (required)</Label>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="WORKING" id="WORKING" />
                                                        <Label htmlFor="WORKING">WORKING</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="STUDYING" id="STUDYING" />
                                                        <Label htmlFor="STUDYING">STUDYING</Label>
                                                    </div>
                                                </RadioGroup>
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/**For profile status */}
                            <FormField
                                control={form.control}
                                name="isPublic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Label htmlFor="userStatus">Select Your Profile Status (required)</Label>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="PUBLIC" id="PUBLIC" />
                                                        <Label htmlFor="PUBLIC">PUBLIC</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="PRIVATE" id="PRIVATE" />
                                                        <Label htmlFor="PRIVATE">PRIVATE</Label>
                                                    </div>
                                                </RadioGroup>
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton pending={form.formState.isSubmitting}>
                                Submit
                            </LoadingButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
