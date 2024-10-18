"use client";
import React, { useEffect, useState } from "react";

// Fetching the news data with pagination
export async function generateNews(page = 1) {
    const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${key}&country=in&language=en&page=${page}`
    );

    if (res.ok) {
        const data = await res.json();
        return data.results; // Assuming 'results' contains the array of news articles
    } else {
        return [];
    }
}

// Default export for the News page component
export default function News() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [totalResults, setTotalResults] = useState(0); // Total news articles count

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            const data = await generateNews(currentPage);
            setNewsData(data);
            setTotalResults(100); // Update this based on API response if available
            setLoading(false);
        }

        fetchNews();
    }, [currentPage]); // Re-fetch news when page changes

    // Handle next page click
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Handle previous page click
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    if (loading) {
        return <p>Loading news...</p>;
    }

    return (
        <div className="news-container py-10 px-6 bg-neutral-900 text-white">
            <h1 className="text-4xl font-bold text-center mb-10">Latest News</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.length > 0 ? (
                    newsData.map((article, index) => (
                        <div key={index} className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={article.image_url ? article.image_url : '/placeholder-image.jpg'} // Fallback image if no image is provided
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-indigo-400 mb-2">{article.title}</h3>
                                <p className="text-neutral-400 mb-4">{article.description}</p>
                                <p className="text-sm text-neutral-500 mb-4">
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
                    <p>No news available.</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-center mt-10">
                <p className="text-gray-500">
                    Showing {currentPage * itemsPerPage - (itemsPerPage - 1)} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} entries
                </p>

                <nav aria-label="Pagination" className="flex items-center space-x-2 text-gray-600 mt-4 lg:mt-0">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded ${i + 1 === currentPage ? 'bg-gray-200 text-gray-900 font-medium' : 'hover:bg-gray-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    );
}
