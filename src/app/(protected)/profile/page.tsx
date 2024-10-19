import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserById } from "@/app/actions/userActions";
export default async function ProfileSection() {
    const session = await auth();
    const userDetails = await getUserById(session?.user?.id as string);

    return (
        <section className="profile-section py-12 bg-gray-50">
            <div className="flex flex-col justify-center items-center space-y-8">
                {/* Profile Card */}
                <Card className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-8">
                    <CardHeader className="flex flex-col items-center justify-center space-y-6">
                        {/* Avatar */}
                        <Avatar className="h-40 w-40 shadow-lg ring-4 ring-gray-300">
                            <AvatarImage
                                src={session?.user?.image || "https://example.com/default-avatar.jpg"}
                                alt="User Avatar"
                            />
                            <AvatarFallback>{session?.user?.name?.charAt(0) || "JD"}</AvatarFallback>
                        </Avatar>

                        {/* Name & Bio */}
                        <div className="text-center">
                            <CardTitle className="text-3xl font-bold text-gray-900">
                                {userDetails?.profile?.userName}
                            </CardTitle>
                            <p className="text-gray-600">{session?.user.role || "Freelancer"}</p>
                            <p className="text-gray-500 mt-2">{userDetails?.profile?.bio || "No bio available."}</p>
                        </div>
                    </CardHeader>

                    {/* Stats */}
                    <CardContent className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-gray-800 py-6">
                        <div className="text-center">
                            <h3 className="text-lg font-bold">120</h3>
                            <p className="text-gray-500">Followers</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold">{userDetails?.projects.length}</h3>
                            <p className="text-gray-500">Projects Completed</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold">5.0</h3>
                            <p className="text-gray-500">Reviews</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold">{userDetails?.profile?.hourlyRate || "N/A"} ₹/hour</h3>
                            <p className="text-gray-500">Hourly Rate</p>
                        </div>
                    </CardContent>

                    {/* Additional Information */}
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 py-4">
                        <div>
                            <h3 className="text-lg font-semibold">Location</h3>
                            <p>{userDetails?.profile?.city}, {userDetails?.profile?.state}</p>
                            <p>Zip: {userDetails?.profile?.zip}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Skills</h3>
                            <p>{userDetails?.profile?.skills.join(', ') || "No skills listed."}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">LinkedIn</h3>
                            <a
                                href={userDetails?.profile?.linkedin || "#"}
                                target="_blank"
                                className="text-blue-500 hover:underline"
                            >
                                {userDetails?.profile?.linkedin || "Not Linked"}
                            </a>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">GitHub</h3>
                            <a
                                href={userDetails?.profile?.github || "#"}
                                target="_blank"
                                className="text-blue-500 hover:underline"
                            >
                                {userDetails?.profile?.github || "Not Linked"}
                            </a>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Twitter</h3>
                            <a
                                href={userDetails?.profile?.twitter || "#"}
                                target="_blank"
                                className="text-blue-500 hover:underline"
                            >
                                {userDetails?.profile?.twitter || "Not Linked"}
                            </a>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Freelancing Preferences</h3>
                            <p>{userDetails?.profile?.freelancingPreferences || "No preferences set."}</p>
                        </div>
                    </CardContent>

                    {/* Actions */}
                    <CardFooter className="flex justify-center space-x-6 mt-6">
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <Link href="/createBlog" className="text-white">Create Blog</Link>
                        </Button>
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Edit Profile
                        </Button>
                    </CardFooter>
                </Card>

                {/* Separator */}
                <Separator className="my-8 w-full max-w-5xl" />

                {/* Tabs Section */}
                <Tabs defaultValue="blogs" className="w-full max-w-5xl bg-white rounded-lg shadow-lg">
                    <TabsList className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-t-lg">
                        <TabsTrigger value="blogs" className="text-gray-700 hover:text-blue-500 transition-colors">Your Blogs</TabsTrigger>
                        <TabsTrigger value="projects" className="text-gray-700 hover:text-blue-500 transition-colors">Your Projects</TabsTrigger>
                        <TabsTrigger value="comments" className="text-gray-700 hover:text-blue-500 transition-colors">Comments</TabsTrigger>
                    </TabsList>

                    {/* Tab Content: Blogs */}
                    <TabsContent value="blogs" className="p-6 text-gray-700">
                        {userDetails?.blogs?.length ? (
                            userDetails?.blogs.map((blog) => (
                                <Card key={blog.id} className="bg-gray-50 p-4 rounded-md shadow-md hover:bg-gray-100 transition-all">
                                    <p className="text-gray-600">{blog.title}</p>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500">No blogs available</p>
                        )}
                    </TabsContent>

                    {/* Tab Content: Projects */}
                    <TabsContent value="projects" className="p-6 text-gray-700">
                        {userDetails?.projects?.length ? (
                            userDetails?.projects.map((project) => (
                                <Card key={project.id} className="bg-gray-50 p-4 rounded-md shadow-md hover:bg-gray-100 transition-all">
                                    <p className="text-gray-600">{project.title}</p>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500">No projects available</p>
                        )}
                    </TabsContent>

                    {/* Tab Content: Comments */}
                    <TabsContent value="comments" className="p-6 text-gray-700">
                        {userDetails?.comments?.length ? (
                            userDetails?.comments.map((comment) => (
                                <Card key={comment.id} className="bg-gray-50 p-4 rounded-md shadow-md hover:bg-gray-100 transition-all">
                                    <p className="text-gray-600">{comment.content}</p>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments available</p>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </section>

    );
}
