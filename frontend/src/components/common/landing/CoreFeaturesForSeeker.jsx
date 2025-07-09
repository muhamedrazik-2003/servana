import React, { useRef } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import * as Icons from 'lucide-react'

function CoreFeaturesForSeeker() {
    const containerRef = useRef()

    const coreFeatures = [
        {
            titleIcon: "BadgeCheck",
            title: "Verified Local Professionals",
            description: "Every service provider is carefully vetted through identity and skill verification, so you can trust who’s showing up at your door."
        },
        {
            titleIcon: "Zap",
            title: "Fast & Secure Booking",
            description: "Book services in just a few taps—browse, match, and schedule with ease. No delays, no third-party hassle."
        },
        {
            titleIcon: "Users",
            title: "Trusted by Communities Nationwide",
            description: "Servana powers hundreds of successful connections every week between real people in real neighborhoods."
        },
        {
            titleIcon: "Wallet",
            title: "Simple Onboarding & Reliable Payouts",
            description: "Providers can join for free, create a profile in minutes, and receive weekly payments—no hidden fees, ever."
        },
        {
            titleIcon: "Lock",
            title: "Privacy You Can Count On",
            description: "We protect your personal information. No selling, no spam—just secure service."
        },
        {
            titleIcon: "Wrench",
            title: "Support for a Wide Range of Services",
            description: "Whether it’s plumbing, tutoring, cleaning, or personal training—Servana connects you to the right people."
        },
        {
            titleIcon: "Smartphone",
            title: "Optimized for All Devices",
            description: "Designed mobile-first for a smooth, seamless experience—at home or on the go."
        }
    ];

    const handleNext = () => {
        containerRef.current.scrollLeft += 320;
    };

    const handlePrev = () => {
        containerRef.current.scrollLeft -= 320;
    };
    return (
        <section className='mx-0 pl-[100px]'>
            <h2 className='max-w-[600px]'>Made for Local Service. Built for Trust.</h2>
            <p className='mb-[72px]'>We remove the friction so customers and providers can focus on what truly matters—results and relationships.</p>
            <div ref={containerRef} className='scroll-smooth overflow-x-auto scrollbar-none ml-[-100px] pl-[100px] scrolllbar-hidden'>
                <div className='flex gap-5'>
                    {
                        coreFeatures.map((feature, index) => {
                            const Icon = Icons[feature.titleIcon]
                            return (
                                <Card key={index} className={'w-[300px] shrink-0 bg-teal-100'}>
                                    <CardHeader>
                                        <CardTitle className={'flex items-center gap-2'}>
                                            <Icon className={'size-5'} />
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{feature.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex gap-6 justify-end mt-10 mr-20'>
                <Icons.ChevronLeft onClick={handlePrev} className='text-foreground shadow size-10 p-2 rounded-full bg-indigo-100' />
                <Icons.ChevronLeft onClick={handleNext} className='text-foreground shadow size-10 p-2 rounded-full bg-indigo-100 rotate-180' />

            </div>

        </section>
    )
}

export default CoreFeaturesForSeeker