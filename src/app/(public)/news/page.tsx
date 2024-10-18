import { getNewsData } from "@/lib/newsData";
import Image from "next/image";
import React from "react";

// Server action to fetch news data


interface Article {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    image_url: string;
}

// Default export for the News page component
export default async function News() {
    // Fetching news data directly from server action
    const newsData = await getNewsData();

    return (
        <div className="container py-10">
            <h1 className="text-4xl font-bold text-center mb-10">Latest News</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.length > 0 ? (
                    newsData.map((article: Article, index: number) => (
                        <div
                            key={index}
                            className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden max-h-[500px]"
                            style={{ height: "500px" }} // Set fixed height for the card
                        >
                            <Image
                                src={article.image_url ? article.image_url : '/placeholder-image.jpg'} // Fallback image if no image is provided
                                alt={article.title}
                                className="w-full object-cover"
                                height={200} // Adjust image height to take part of the card height
                                width={640}
                            />
                            <div className="p-4 h-[300px] flex flex-col justify-between">
                                <div className="overflow-hidden">
                                    <h3 className="text-xl font-bold text-indigo-400 mb-2 truncate">
                                        {article.title}
                                    </h3>
                                    <p className="text-neutral-400 mb-4 line-clamp-3 overflow-hidden">
                                        {article.description}
                                    </p>
                                </div>
                                <p className="text-sm text-neutral-500">
                                    Published on: {new Date(article.pubDate).toLocaleDateString()}
                                </p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-500 hover:underline"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No news available</p>
                )}
            </div>
        </div>
    );
}
