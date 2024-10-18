import { object, string, z } from "zod";
export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});
export const signUpSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required.")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string({ required_error: "Confirm password is required" })
        .min(1, "Confirm password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export const onboardSchema = z.object({
    userName: z.string({ required_error: "User name is required" })
        .min(1, "User name is required")
        .max(50, "User name must be at most 50 characters long"),
    bio: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
        invalid_type_error: "Gender is required",
    }),
    phoneNumber: z.number().min(1000000000).max(99999999999).optional(),
    age: z.number({ required_error: "Date of birth is required" })
        .min(18, "Date of birth must be at least 18 years old")
        .max(80, "Date of birth must be at most 80 years old")
    ,
    zip: z.number({ required_error: "Zip code is required" })
        .min(100000, "Zip code must be at least 5 digits")
        .max(999999, "Zip code must be at most 6 digits"),
    city: z.string({ required_error: "City is required" })
        .min(1, "City is required")
        .max(100, "City must be at most 100 characters long"),
    state: z.string({ required_error: "State is required" })
        .min(1, "State is required")
        .max(100, "State must be at most 100 characters long"),
    password: z.string({ required_error: "Password is required" })
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string({ required_error: "Confirm password is required" })
        .min(8, "Confirm password must be more than 8 characters")
        .max(32, "Confirm password must be less than 32 characters"),
    role: z.enum(["CLIENT", "FREELANCER"], {
        invalid_type_error: "Role is required",
    }),
    skills: z.string({ required_error: "Skills are required" }).array(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    freelancingPreferences: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    currentWorkExperience: z.string().optional(),
    previousWorkExperience: z.string().array().optional(),
    highestEducation: z.string().optional(),
    currentJob: z.string().optional(),
    hourlyRate: z.number().optional(),
    userStatus: z.enum(["WORKING", "STUDYING"], { required_error: "User status is required", }),
    isPublic: z.enum(["PUBLIC", "PRIVATE"], { required_error: "Profile status is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const blogSchema = z.object({
    title: z.string({ required_error: "User name is required" })
        .min(5, { message: "Title must be at least 5 characters long." })
        .max(100, { message: "Title must not exceed 100 characters." }),

    content: z.string({ required_error: "User name is required" })
        .min(10, { message: "Content must be at least 20 characters long." })
        .max(5000, { message: "Content must not exceed 5000 characters." })
});
export const projectSchema = z.object({
    title: z.string({ required_error: "Project title is required" })
        .min(5, { message: "Project title must be at least 5 characters long." })
        .max(100, { message: "Project title must not exceed 100 characters." }),

    description: z.string({ required_error: "Project description is required" })
        .min(20, { message: "Description must be at least 20 characters long." })
        .max(5000, { message: "Description must not exceed 5000 characters." }),

    budget: z.number({ required_error: "Budget is required" })
        .positive({ message: "Budget must be a positive number" })
        .max(1000000, { message: "Budget must not exceed 1,000,000." }),
    paymentType: z.enum(['one-time basis', 'monthly basis', 'work-progress basis'], {
        required_error: "Payment type is required"
    }),
});