import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TwitterLogoIcon, DiscordLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'; // Radix UI icons import
import Image from 'next/image'; // For optimized image handling in Next.js

const sections = [
    {
        title: 'Product',
        links: [
            { name: 'Overview', href: '#' },
            { name: 'Pricing', href: '#' },
            { name: 'Marketplace', href: '#' },
            { name: 'Features', href: '#' },
            { name: 'Integrations', href: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About', href: '#' },
            { name: 'Team', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Contact', href: '#' },
            { name: 'Privacy', href: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { name: 'Help', href: '#' },
            { name: 'Sales', href: '#' },
            { name: 'Advertise', href: '#' },
        ],
    },
];

const Footer = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto px-4">
                <footer>
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <Image
                            src="https://www.shadcnblocks.com/images/block/block-1.svg"
                            alt="Workup Logo"
                            width={120}
                            height={40}
                            className="mb-8 mr-auto h-7 md:mb-0"
                        />
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <p className="text-lg font-medium">
                                Explore endless opportunities with Workup.
                            </p>
                            <div className="flex gap-2">
                                <Button className="p-2.5" variant="default">
                                    <InstagramLogoIcon className="w-6 h-6" />
                                </Button>
                                <Button className="p-2.5" variant="default">
                                    <LinkedInLogoIcon className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-14 bg-gray-700" />

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-gray-400">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div>
                            <h3 className="mb-4 font-bold">Legal</h3>
                            <ul className="space-y-4 text-gray-400">
                                <li className="font-medium hover:text-primary">
                                    <a href="#">Terms of Service</a>
                                </li>
                                <li className="font-medium hover:text-primary">
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>

                            <h3 className="mb-4 mt-8 font-bold">Social</h3>
                            <ul className="flex items-center space-x-6 text-gray-400">
                                <li className="hover:text-primary">
                                    <a href="#">
                                        <DiscordLogoIcon className="w-6 h-6" />
                                    </a>
                                </li>
                                <li className="hover:text-primary">
                                    <a href="#">
                                        <LinkedInLogoIcon className="w-6 h-6" />
                                    </a>
                                </li>
                                <li className="hover:text-primary">
                                    <a href="#">
                                        <TwitterLogoIcon className="w-6 h-6" />
                                    </a>
                                </li>
                                <li className="hover:text-primary">
                                    <a href="#">
                                        <InstagramLogoIcon className="w-6 h-6" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-14 bg-gray-700" />

                    <p className="text-sm text-gray-400">
                        © 2024 Workup. All rights reserved.
                    </p>
                </footer>
            </div>
        </section>
    );
};

export default Footer;
