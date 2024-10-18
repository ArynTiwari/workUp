import { getUserById } from "@/app/actions/userActions"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "lucide-react"
interface UserProfileProps {
    params: {
        id: string
    }
}
export default async function UserProfile({ params }: UserProfileProps) {
    const { id } = params
    console.log(id)
    const user = await getUserById(id)

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl text-center font-bold mb-4">User Profile</h1>
            <div className="flex flex-col items-center">
                {/* User Avatar */}
                <div className="flex flex-row items-center w-full justify-between">
                    <Avatar>
                        <AvatarImage src={user.image || "/default-avatar.png"} alt={user.name || "User Avatar"} />
                        <AvatarFallback>{user.name?.[0] || "N/A"}</AvatarFallback>
                    </Avatar>
                    <div>
                        {/* User Information */}
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="text-gray-700 font-medium">Role: {user.role}</p>
                        <Badge color={user.isEmailVerified ? 'blue' : 'red'}>
                            {user.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                        </Badge>

                        {/* Display user onboarding, verification status */}
                        <p className="text-gray-600">Account Onboarded: {user.isBoarded ? 'Yes' : 'No'}</p>
                        <p className="text-gray-600">Verified: {user.isVerified ? 'Yes' : 'No'}</p>
                    </div>
                </div>



                {/* Additional User Profile Info */}
                {user.profile && (
                    <Card className="mt-6 w-full">
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                            <CardDescription>Users additional information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Bio: {user.profile.bio || 'No bio available'}</p>
                            <p className="text-sm">Location: {user.profile.city || 'No location specified'}</p>
                            <p className="text-sm">State: {user.profile.state || 'No website available'}</p>
                        </CardContent>
                    </Card>
                )}

                {/* User Projects */}
                <div className="mt-6 w-full">
                    <h3 className="text-xl font-semibold mb-2">Projects</h3>
                    {user.projects.length > 0 ? (
                        user.projects.map((project) => (
                            <Card key={project.id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription>Budget: ${project.budget}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{project.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <p className="text-sm">Created on: {new Date(project.createdAt).toLocaleDateString()}</p>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>

                {/* User Jobs */}
                <div className="mt-6 w-full">
                    <h3 className="text-xl font-semibold mb-2">Jobs Posted</h3>
                    {user.jobs.length > 0 ? (
                        user.jobs.map((job) => (
                            <Card key={job.id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{job.title}</CardTitle>
                                    <CardDescription>{job.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    ) : (
                        <p>No jobs posted.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
