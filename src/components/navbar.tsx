"use client"
import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react"
import { cn } from '@/lib/utils';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'; // For handling the avatar
import Link from 'next/link';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

// Reusable sub-menu items
const subMenuItems = [
    {
        category: 'Projects',
        items: [
            {
                title: 'All Projects',
                description: 'Explore the latest projects available for freelancing.',
                icon: <Book className="size-5 shrink-0" />,
                href: '/projects'  // Navigate to the Projects listing page
            },
            {
                title: 'How to upload project?',
                description: 'Learn the steps to submit your projects and start collaborating.',
                icon: <Trees className="size-5 shrink-0" />,
                href: '/help/upload-project'  // Guide on how to upload a project
            },
            {
                title: 'How to get project?',
                description: 'Tips on securing freelancing projects on Workup.',
                icon: <Sunset className="size-5 shrink-0" />,
                href: '/help/get-project'  // Guide for freelancers on obtaining projects
            },
            {
                title: 'Support',
                description: 'Contact our support team for any assistance or queries.',
                icon: <Zap className="size-5 shrink-0" />,
                href: '/support'  // Support page for contacting the team
            },
        ],
    },
    {
        category: 'Resources',
        items: [
            {
                title: 'Help Center',
                description: 'Access FAQs and troubleshooting tips.',
                icon: <Zap className="size-5 shrink-0" />,
                href: '/help-center'  // Help center for general queries
            },
            {
                title: 'Contact Us',
                description: 'Reach out to us with your questions or concerns.',
                icon: <Sunset className="size-5 shrink-0" />,
                href: '/contact'  // Contact page for general inquiries
            },
            {
                title: 'Status',
                description: 'Check the operational status of Workup services.',
                icon: <Trees className="size-5 shrink-0" />,
                href: '/status'  // Service status page for platform uptime
            },
            {
                title: 'Terms of Service',
                description: 'Review our terms and conditions for using Workup.',
                icon: <Book className="size-5 shrink-0" />,
                href: '/terms'  // Terms and conditions page
            },
        ],
    },
];


const Navbar1 = () => {
    const { data: session } = useSession();
    return (
        <section className="nav">
            <div className="container">
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo Section */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                className="w-8"
                                alt="logo"
                                width={40}
                                height={40}
                            />
                            <span className="text-2xl font-bold">WorkUp IN</span>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center">
                            <Link className={cn('text-muted-foreground text-xl', navigationMenuTriggerStyle, buttonVariants({ variant: 'ghost' }),)} href="/">
                                Home
                            </Link>

                            {/* Projects and Resources Menu */}
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {subMenuItems.map((menu, idx) => (
                                        <NavigationMenuItem
                                            key={idx}
                                            className="text-muted-foreground"
                                        >
                                            <NavigationMenuTrigger>
                                                {menu.category}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="w-80 p-3">
                                                    <NavigationMenuLink>
                                                        {menu.items.map((item, itemIdx) => (
                                                            <li key={itemIdx}>
                                                                <Link
                                                                    className={cn(
                                                                        'flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                                                    )}
                                                                    href={item.href}
                                                                >
                                                                    {item.icon}
                                                                    <div>
                                                                        <div className="text-sm font-semibold">
                                                                            {item.title}
                                                                        </div>
                                                                        <p className="text-sm leading-snug text-muted-foreground">
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </NavigationMenuLink>
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>

                            {/* Blogs Link */}
                            <Link className={cn('text-muted-foreground', navigationMenuTriggerStyle, buttonVariants({ variant: 'ghost' }),)} href="/blogs">
                                Blogs
                            </Link>
                            <Link className={cn('text-muted-foreground', navigationMenuTriggerStyle, buttonVariants({ variant: 'ghost' }),)} href="/news">
                                News
                            </Link>
                        </div>
                    </div>

                    {/* Conditional User Authentication Section */}
                    <div className="flex gap-2">
                        {session ? (
                            <div className="flex items-center gap-2">
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <Avatar >
                                            <AvatarImage className='rounded-full' height={37} width={37} src={session?.user?.image ? session?.user?.image : 'https://imgs.search.brave.com/TSxhBNUHzzP6vPVtUYGvUIpHQkWDxaw24bgTludq9o4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcHJvZmlsZS1w/aWMtaWNvbi1jb2xv/cmVkLXNoYXBlcy1n/cmFkaWVudF8xMDc2/NjEwLTQ2MDI4Lmpw/Zz9zZW10PWFpc19o/eWJyaWQ'} />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                <Link href={'/profile'}>Profile</Link>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                <span>Billing</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Keyboard className="mr-2 h-4 w-4" />
                                                <span>Keyboard shortcuts</span>
                                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <LifeBuoy className="mr-2 h-4 w-4" />
                                            <span>Support</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <Button variant="destructive" onClick={() => signOut()}>Log Out</Button>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        ) : (
                            <>
                                <Button onClick={() => signIn()} variant="outline">Log in</Button>
                                <Link href="/auth/signup">
                                    <Button variant="outline">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                className="w-8"
                                alt="logo"
                                width={40}
                                height={40}
                            />
                            <span className="text-xl font-bold">WorkUp IN</span>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={'outline'} size={'icon'}>
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                                className="w-8"
                                                alt="logo"
                                                width={40}
                                                height={40}
                                            />
                                            <span className="text-xl font-bold">WorkUp IN</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="my-8 flex flex-col gap-4">
                                    <Link href="/" className="font-semibold">
                                        Home
                                    </Link>
                                    <Accordion type="single" collapsible className="w-full">
                                        {subMenuItems.map((menu, idx) => (
                                            <AccordionItem
                                                key={idx}
                                                value={menu.category.toLowerCase()}
                                                className="border-b-0"
                                            >
                                                <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline">
                                                    {menu.category}
                                                </AccordionTrigger>
                                                <AccordionContent className="mt-2">
                                                    {menu.items.map((item, itemIdx) => (
                                                        <a
                                                            key={itemIdx}
                                                            className={cn(
                                                                'flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                                            )}
                                                            href="#"
                                                        >
                                                            {item.icon}
                                                            <div>
                                                                <div className="text-sm font-semibold">
                                                                    {item.title}
                                                                </div>
                                                                <p className="text-sm leading-snug text-muted-foreground">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    <a href="#" className="font-semibold">
                                        Blog
                                    </a>
                                </div>

                                {/* Footer in mobile */}
                                <div className="border-t pt-4">
                                    <div className="grid grid-cols-2 justify-start">
                                        {['Press', 'Contact', 'Imprint', 'Sitemap', 'Legal', 'Cookie Settings'].map(
                                            (link, idx) => (
                                                <Link key={idx} className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start text-muted-foreground',)}
                                                    href="#">
                                                    {link}
                                                </Link>
                                            ),
                                        )}
                                    </div>
                                    <div className="border-t pt-4 mt-2 flex flex-col gap-3">
                                        {session ? (
                                            <div className="space-y-4">
                                                <div className='flex items-center gap-4'>
                                                    <Avatar>
                                                        <AvatarImage src={session.user.image ? session.user.image : 'https://imgs.search.brave.com/TSxhBNUHzzP6vPVtUYGvUIpHQkWDxaw24bgTludq9o4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcHJvZmlsZS1w/aWMtaWNvbi1jb2xv/cmVkLXNoYXBlcy1n/cmFkaWVudF8xMDc2/NjEwLTQ2MDI4Lmpw/Zz9zZW10PWFpc19o/eWJyaWQ'} />
                                                    </Avatar>
                                                </div>
                                                <Button variant="destructive" onClick={() => signOut()}>Log Out</Button>
                                            </div>
                                        ) : (
                                            <>
                                                <Button onClick={() => signIn()} variant="default">Log in</Button>
                                                <Link href="/auth/signup">
                                                    <Button variant="outline">Sign up</Button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar1;
