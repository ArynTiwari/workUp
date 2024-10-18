import { ArrowRight, Calendar, User } from 'lucide-react';

import { Button } from '@/components/ui/button';

const posts = [
    {
        id: 'post-1',
        title: 'Mastering Freelancing: Key Strategies for Success',
        summary:
            'Explore the most effective strategies for building a successful freelancing career. Learn how to stand out in a competitive market.',
        label: 'Freelancing Tips',
        author: 'John Doe',
        published: '3 Oct 2024',
        href: '#',
        image: 'https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg',
    },
    {
        id: 'post-2',
        title: 'The Future of Remote Work: Trends and Insights',
        summary:
            'As remote work continues to evolve, discover the trends shaping its future and how you can adapt to stay ahead.',
        label: 'Remote Work',
        author: 'Jane Smith',
        published: '2 Oct 2024',
        href: '#',
        image: 'https://www.shadcnblocks.com/images/block/placeholder-dark-2.svg',
    },
    {
        id: 'post-3',
        title: 'How to Land High-Quality Clients on Workup',
        summary:
            'Learn proven strategies for finding and securing high-quality clients on the Workup platform, perfect for freelancers looking to grow.',
        label: 'Client Management',
        author: 'Emily Clark',
        published: '1 Oct 2024',
        href: '#',
        image: 'https://www.shadcnblocks.com/images/block/placeholder-dark-3.svg',
    },
];

const Blog7 = () => {
    return (
        <section className="py-4">
            <div className="container flex flex-col items-center gap-16 lg:px-16">
                {/* Featured Blog */}
                <div className="w-full mb-16">
                    <h2 className="text-pretty text-3xl font-semibold mb-6">Featured Blog</h2>
                    <div className="relative">
                        <img
                            src={posts[0].image}
                            alt={posts[0].title}
                            className="w-full h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg w-full">
                            <h3 className="text-2xl font-bold text-white">{posts[0].title}</h3>
                            <p className="text-sm text-neutral-400">{posts[0].summary}</p>
                            <Button variant="link" className="mt-4 text-indigo-500 hover:text-indigo-400">
                                Read More <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {posts.map((post) => (
                        <a
                            key={post.id}
                            href={post.href}
                            className="flex flex-col text-clip rounded-xl border border-border overflow-hidden hover:shadow-lg hover:scale-105 transition-transform"
                        >
                            <div>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="aspect-[16/9] size-full object-cover object-center"
                                />
                            </div>
                            <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                                    {post.title}
                                </h3>
                                <p className="text-sm mb-2 text-indigo-400">{post.label}</p>
                                <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                                    {post.summary}
                                </p>
                                <div className="flex items-center text-neutral-500 text-xs space-x-4 mb-4">
                                    <div className="flex items-center">
                                        <User className="mr-1 size-4" />
                                        {post.author}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="mr-1 size-4" />
                                        {post.published}
                                    </div>
                                </div>
                                <p className="flex items-center hover:underline text-indigo-500">
                                    Read more
                                    <ArrowRight className="ml-2 size-4" />
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col lg:flex-row justify-between items-center mt-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
                        <button className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
                            10 items
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </button>
                        <p className="text-gray-500 mt-4 lg:mt-0">Showing 1 to 10 of 95 entries</p>
                    </div>
                    <nav
                        aria-label="Pagination"
                        className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0"
                    >
                        <a href="#" className="p-2 mr-4 rounded hover:bg-gray-100">
                            <ArrowRight className="h-6 w-6 rotate-180" />
                        </a>
                        <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
                            1
                        </a>
                        <a href="#" className="px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100">
                            2
                        </a>
                        <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
                            3
                        </a>
                        <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
                            ...
                        </a>
                        <a href="#" className="px-4 py-2 rounded hover:bg-gray-100">
                            9
                        </a>
                        <a href="#" className="p-2 ml-4 rounded hover:bg-gray-100">
                            <ArrowRight className="h-6 w-6" />
                        </a>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Blog7;
