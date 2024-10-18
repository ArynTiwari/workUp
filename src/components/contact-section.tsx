import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
    return (
        <section className="py-10 bg-gray-50">
            <div className="container mx-auto w-full px-4">
                <div className="flex flex-col justify-between gap-16 lg:flex-row lg:gap-20 max-w-screen-xl mx-auto">
                    {/* Left Column - Contact Info */}
                    <div className="flex flex-col gap-8 mx-auto text-center lg:text-left lg:max-w-md">
                        <div>
                            <h1 className="mb-4 text-4xl font-semibold lg:text-5xl">
                                Contact Us
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
                            </p>
                        </div>
                        <div className="w-fit mx-auto lg:mx-0">
                            <h3 className="mb-6 text-2xl font-semibold">Contact Details</h3>
                            <ul className="ml-4 list-disc text-left">
                                <li className="mb-2">
                                    <span className="font-bold">Phone: </span>
                                    (123) 34567890
                                </li>
                                <li>
                                    <span className="font-bold">Email: </span>
                                    <a href="mailto:your-email@example.com" className="underline text-blue-600 hover:text-blue-800">
                                        your-email@example.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="flex flex-col gap-6 bg-white shadow-lg rounded-lg border p-8 w-full lg:max-w-2xl">
                        <div className="flex flex-col gap-6 lg:flex-row">
                            <div className="grid w-full gap-2">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="text" id="firstname" placeholder="First Name" className="p-3 rounded-md border" />
                            </div>
                            <div className="grid w-full gap-2">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="text" id="lastname" placeholder="Last Name" className="p-3 rounded-md border" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" className="p-3 rounded-md border" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input type="text" id="subject" placeholder="Subject" className="p-3 rounded-md border" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea placeholder="Type your message here." id="message" className="p-3 rounded-md border" />
                        </div>
                        <Button className="">
                            Send Message
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ContactSection;
