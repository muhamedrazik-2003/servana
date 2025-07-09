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

function ServiceCategory() {
    const containerRef = useRef()

    const categories = [
        {
            title: "Home Services",
            icon: "Home",
            image: "https://images.unsplash.com/photo-1629219219301-9895daf2c199?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // man fixing kitchen sink
        },
        {
            title: "Cleaning Services",
            icon: "Broom",
            image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5lcnxlbnwwfDF8MHx8fDA%3D" // woman mopping home
        },
        {
            title: "Beauty & Wellness",
            icon: "Sparkles",
            image: "https://images.unsplash.com/photo-1731514771613-991a02407132?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjaWFsfGVufDB8MXwwfHx8MA%3D%3D" // beautician doing facial
        },
        {
            title: "Tutors & Education",
            icon: "BookOpen",
            image: "https://plus.unsplash.com/premium_photo-1671796330621-d6ff427c399f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhY2hpbmd8ZW58MHwxfDB8fHww" // home tutor teaching girl
        },
        {
            title: "Delivery & Errands",
            icon: "Package",
            image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaXZlcnl8ZW58MHwxfDB8fHww" // delivery man handing parcel
        },
        {
            title: "Tech & IT Help",
            icon: "MonitorSmartphone",
            image: "https://images.unsplash.com/photo-1721333089073-215a56fd710c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml4aW5nJTIwbGFwdG9wfGVufDB8MXwwfHx8MA%3D%3D" // tech support fixing laptop
        },
        {
            title: "Care Services",
            icon: "HeartHandshake",
            image: "https://plus.unsplash.com/premium_photo-1681996583708-b7fca2e8ed2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2FyZSUyMEdpdmVyfGVufDB8MXwwfHx8MA%3D%3D" // caregiver with senior lady
        },
        {
            title: "Pet Care",
            icon: "PawPrint",
            image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0JTIwY2FyZXxlbnwwfDF8MHx8fDA%3D" // dog groomer at work
        },
        {
            title: "Automotive Services",
            icon: "Car",
            image: "https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww" // mechanic fixing car
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
            <h2 className='max-w-[600px]'>Services That Simplify Everyday Life.</h2>
            <p className='mb-[72px]'>Servana connects you with nearby experts—fast, reliable, and verified.</p>
            <div ref={containerRef} className='scroll-smooth overflow-x-auto scrollbar-none ml-[-100px] pl-[100px] scrolllbar-hidden'>
                <div className='flex gap-5'>
                    {
                        categories.map((category, index) => {
                            const Icon = Icons[category.titleIcon]
                            return (
                                <Card key={index} className={'w-[320px] shrink-0 p-0 relative'}>
                                    <CardTitle className={'flex items-center gap-2 absolute top-4 left-5 bg-background py-2 px-4 rounded-4xl'}>
                                            {/* <Icon className={'size-5'} /> */}
                                            {category.title}
                                        </CardTitle>
                                    <CardContent className={'p-0'}>
                                        <img className='object-cover h-[500px] w-full rounded-2xl'   src={category.image} alt="" />
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

export default ServiceCategory
