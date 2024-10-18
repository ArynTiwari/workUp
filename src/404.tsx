import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const NotFound: NextPage = () => {
    return (
        <>
            <title>Not found!</title>
            <section className="flex h-[80vh] items-center justify-center overflow-hidden">
                <div className="flex items-center">
                    <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
                        <div className="max-w-md">
                            <div className="font-dark text-5xl font-bold">404 :(</div>
                            <p className="text-2xl font-light leading-normal md:text-3xl">
                                Sorry we couldn&apos;t find this page.{" "}
                            </p>
                            <p className="mb-8">
                                But dont worry, you can find plenty of other things on our
                                homepage.
                            </p>
                            <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-violet-800 focus:outline-none active:bg-blue-600">
                                <Link href={'/'}>Back to HomePage</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;
