import React, { useRef } from 'react'

import * as Icons from 'lucide-react'
import ServiceCard from '../../seeker/ServiceCard'
import { Button } from '../../ui/button'

function ServiceCategory({ format }) {
    const containerRef = useRef()

    const topServices = [
        {
            title: "Plumbing",
            titleIcon: "Wrench",
            image: "https://images.unsplash.com/photo-1629219219301-9895daf2c199?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // man fixing kitchen sink
            providerCount: 22,
            popular: true
        },
        {
            title: "Home Cleaning",
            titleIcon: "Brush",
            image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5lcnxlbnwwfDF8MHx8fDA%3D", // woman mopping home
            providerCount: 18,
            popular: true
        },
        {
            title: "Beauty & Grooming",
            titleIcon: "Sparkles",
            image: "https://images.unsplash.com/photo-1731514771613-991a02407132?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjaWFsfGVufDB8MXwwfHx8MA%3D%3D", // beautician doing facial
            providerCount: 15,
            popular: false
        },
        {
            title: "Private Tutoring",
            titleIcon: "BookOpen",
            image: "https://plus.unsplash.com/premium_photo-1671796330621-d6ff427c399f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhY2hpbmd8ZW58MHwxfDB8fHww", // home tutor teaching girl
            providerCount: 10,
            popular: false
        },
        {
            title: "Parcel Delivery",
            titleIcon: "Package",
            image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaXZlcnl8ZW58MHwxfDB8fHww", // delivery man handing parcel
            providerCount: 9,
            popular: true
        },
        {
            title: "Tech Support",
            titleIcon: "MonitorSmartphone",
            image: "https://images.unsplash.com/photo-1721333089073-215a56fd710c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml4aW5nJTIwbGFwdG9wfGVufDB8MXwwfHx8MA%3D%3D", // tech support fixing laptop
            providerCount: 12,
            popular: false
        },
        {
            title: "Elderly Care",
            titleIcon: "HeartHandshake",
            image: "https://plus.unsplash.com/premium_photo-1681996583708-b7fca2e8ed2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2FyZSUyMEdpdmVyfGVufDB8MXwwfHx8MA%3D%3D", // caregiver with senior lady
            providerCount: 14,
            popular: false
        },
        {
            title: "Pet Grooming",
            titleIcon: "PawPrint",
            image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0JTIwY2FyZXxlbnwwfDF8MHx8fDA%3D", // dog groomer at work
            providerCount: 8,
            popular: false
        },
        {
            title: "Car Repair",
            titleIcon: "Car",
            image: "https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww", // mechanic fixing car
            providerCount: 11,
            popular: true
        }
    ]

    const handleNext = () => {
        containerRef.current.scrollLeft += 340;
    };

    const handlePrev = () => {
        containerRef.current.scrollLeft -= 340;
    };
    return (
        <section id='categories' className={`mx-0 pl-[32px] lg:pl-[100px] ${format === "seeker" && "pb-10"}`}>
            <div className='flex justify-between items-end md:items-center pr-8 mb-10'>
                <div>
                    <h2 className={`max-w-[600px] ${format === "seeker" && "text-2xl md:text-4xl mb-1"}`}>{format === "seeker" ? "Popular Services Near You" : "Services That Simplify Everyday Life."}</h2>
                    <p className={`${format === "seeker" && "text-base mb-0"}`}>{format === "seeker" ? "Find what others are booking most around your area." : 'Servana connects you with nearby experts—fast, reliable, and verified.'}</p>
                </div>
                <Button variant={'outline'} className={`border ml-auto mb-0 mr-[32px] ${format === "seeker" ? "block" : "hidden"}`}>View More</Button>

            </div>
            <div ref={containerRef} className='scroll-smooth overflow-x-auto scrollbar-none ml-[-100px] pl-[100px] scrolllbar-hidden'>
                <div className='flex gap-5'>
                    {
                        topServices.map((category, index) => {
                            const Icon = Icons[category.titleIcon] || Icons.HelpCircle
                            return (
                                format === "seeker"
                                    ? <ServiceCard format={"seeker"} category={category} Icon={Icon} />
                                    : <ServiceCard category={category} Icon={Icon} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex gap-6 justify-end mt-10 mr-20'>
                <Icons.ChevronLeft onClick={handlePrev} className='text-foreground shadow size-10 p-2 rounded-full bg-indigo-100 dark:bg-indigo-950' />
                <Icons.ChevronLeft onClick={handleNext} className='text-foreground shadow size-10 p-2 rounded-full bg-indigo-100 dark:bg-indigo-950 rotate-180' />

            </div>

        </section>
    )
}

export default ServiceCategory
