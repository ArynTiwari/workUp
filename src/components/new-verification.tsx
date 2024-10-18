"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/app/actions/userActions";
import { AlertCircle, CheckCircle } from "lucide-react"; // Icons for visual feedback
import LoadingButton from "@/components/loading-button"; // Assuming you have a LoadingButton component

export const NewVerification = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Token is missing!");
            return;
        }
        setIsLoading(true);
        newVerification(token!)
            .then((data) => {
                if (data.success) {
                    setSuccess("Your email has been successfully verified!");
                    setError(undefined);
                } else {
                    setError(data.error || "Failed to verify. Please try again.");
                }
            })
            .catch((err) => {
                setError(err.error || "Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Email Verification</h1>
                </CardHeader>
                <CardContent className="mt-4 space-y-6">
                    {/* Loading spinner or content */}
                    {isLoading ? (
                        <div className="flex justify-center">
                            <LoadingButton pending={isLoading}>Loading</LoadingButton>
                        </div>
                    ) : (
                        <>
                            {/* Display success message */}
                            {success && (
                                <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-100 border border-green-200 p-4 rounded-lg">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{success}</span>
                                </div>
                            )}
                            {/* Display error message */}
                            {error && (
                                <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-100 border border-red-200 p-4 rounded-lg">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>

                <CardFooter className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        {success ? "You may now close this page." : "Please wait while we verify your email."}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};
