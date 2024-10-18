import { Lightbulb, ListChecks, MessageCircleMore } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const InfoSection = () => {
    return (
        <section className="py-4">
            <div className="w-full flex flex-row items-center justify-center">
                <Tabs defaultValue="feature-1" className="w-full py-4">
                    <TabsList className="flex h-auto w-full flex-col gap-6 bg-background lg:flex-row lg:gap-0">

                        {/* Tab 1 */}
                        <TabsTrigger value="feature-1" className="flex w-full flex-col items-start gap-3 p-4 text-left rounded-md border hover:border-primary/40 data-[state=active]:border-primary transition-all">
                            <div className="flex items-center gap-2">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                                    <MessageCircleMore className="h-6 w-6 text-primary" />
                                </span>
                                <div>
                                    <p className="text-xl font-semibold">Explore Opportunities</p>
                                    <p className="text-sm text-muted-foreground">Discover various projects and work with top clients.</p>
                                </div>
                            </div>
                        </TabsTrigger>

                        {/* Tab 2 */}
                        <TabsTrigger value="feature-2" className="flex w-full flex-col items-start gap-3 p-4 text-left rounded-md border hover:border-primary/40 data-[state=active]:border-primary transition-all">
                            <div className="flex items-center gap-2">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                                    <Lightbulb className="h-6 w-6 text-primary" />
                                </span>
                                <div>
                                    <p className="text-xl font-semibold">Get Inspired</p>
                                    <p className="text-sm text-muted-foreground">Access creative ideas to boost your freelance career.</p>
                                </div>
                            </div>
                        </TabsTrigger>

                        {/* Tab 3 */}
                        <TabsTrigger value="feature-3" className="flex w-full flex-col items-start gap-3 p-4 text-left rounded-md border hover:border-primary/40 data-[state=active]:border-primary transition-all">
                            <div className="flex items-center gap-2">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                                    <ListChecks className="h-6 w-6 text-primary" />
                                </span>
                                <div>
                                    <p className="text-xl font-semibold">Start Building</p>
                                    <p className="text-sm text-muted-foreground">Kickstart your project and deliver top-notch results.</p>
                                </div>
                            </div>
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Content */}
                    <TabsContent value="feature-1">
                        <Image
                            src="https://cdn.pixabay.com/photo/2016/06/13/09/57/meeting-1453895_1280.png" // Assuming your image is in the 'public/images' folder
                            alt="Explore Opportunities"
                            width={1280} // Set a consistent width
                            height={820} // Set a consistent height
                            className="w-full rounded-md object-cover"
                        />
                    </TabsContent>
                    <TabsContent value="feature-2">
                        <Image
                            src="https://cdn.pixabay.com/photo/2020/12/18/00/43/business-5840870_1280.png"
                            alt="Get Inspired"
                            width={1280}
                            height={620}
                            className="w-full rounded-md object-cover"
                        />
                    </TabsContent>
                    <TabsContent value="feature-3">
                        <Image
                            src="/images/feature3.jpg"
                            alt="Start Building"
                            width={1280}
                            height={720}
                            className="w-full rounded-md object-cover"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
};

export default InfoSection;
