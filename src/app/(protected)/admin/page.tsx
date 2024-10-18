import LoadingSpinner from "@/components/loading-spinner";
import { useSession } from "next-auth/react";
import React from "react";
export default function Admin() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <LoadingSpinner />
    }
    return (
        <>
            <div>{JSON.stringify(session)}</div>
        </>
    )
}