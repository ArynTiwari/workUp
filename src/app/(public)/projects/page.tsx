import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import prisma from '@/prisma'
import { getUserById } from '@/app/actions/userActions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

export default async function Projects() {
    // Fetch all projects
    const projects = await prisma.project.findMany()
    if (projects.length === 0) {
        return <div className='text-black'>No projects found</div>
    }
    // Fetch project owners for all projects
    const projectOwners = await Promise.all(
        projects.map(async (project) => {
            const owner = await getUserById(project.clientId)
            return { ...project, owner }
        })
    )
    return (
        <section className="projects-section">
            <div className="grid grid-cols-1 gap-4">
                {
                    projectOwners.map((project) => (
                        <Card key={project.id} className="bg-white p-4 rounded-md shadow-md hover:bg-gray-100 transition-all">
                            <div className="flex justify-between items-start">
                                {/* Left Section: Project Details */}
                                <div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-800">
                                            {project.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-gray-500">
                                            Created at: {new Date(project.createdAt).toLocaleDateString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="mt-4">
                                        <CardDescription>
                                            {project.description}
                                        </CardDescription>
                                        <p className="text-lg font-semibold mt-2 text-green-600">
                                            Budget: ${project.budget}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`project/${project.id}`} className="text-blue-600 hover:underline">
                                            View Project
                                        </Link>
                                    </CardFooter>
                                </div>
                                {/* Right Section: Project Owner */}
                                <div className="text-right">
                                    <p className="text-sm text-gray-700 font-medium flex items-center gap-6">
                                        Project Owner:
                                        <span>
                                            <Link href={`/users/${encodeURIComponent(project?.owner?.id as string)}`}>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={project?.owner?.image as string} />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}
