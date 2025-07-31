import React, { useEffect, useRef } from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import * as Icons from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getSampleServices } from '../../redux/slices/serviceSlice'

function ServiceCategory({ format }) {
    const containerRef = useRef()
    const dispatch = useDispatch();
    // console.log(services)
    useEffect(() => {
        dispatch(getSampleServices());
    }, [])
    const { services, isLoading, sampleServices } = useSelector(state => state.serviceSlice);
    let topServices = []
    if (services.length > 0) {
        topServices = [...services]?.sort((a, b) => b.totalBookings - a.totalBookings);
        // console.log(topServices)
    } else {
        topServices = [...sampleServices]?.sort((a, b) => b.totalBookings - a.totalBookings);
    }


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
                <Link to={'/seeker/services'}>
                    <Button variant={'outline'} className={`border ml-auto mb-0 mr-[32px] lg:mr-[76px] ${format === "seeker" ? "block" : "hidden"}`}>View More</Button>
                </Link>
            </div>
            <div ref={containerRef} className='scroll-smooth overflow-x-auto scrollbar-none ml-[-100px] pl-[100px] scrolllbar-hidden'>
                <div className='flex gap-5'>
                    {
                        topServices?.slice(0, 8).map((service, index) => {
                            const Icon = Icons.ToolCase
                            return (
                                <Link key={index} to={`/seeker/services/${service._id}`} className={`${format === "seeker" ? "" : "pointer-events-none"}`}>
                                    <Card className={`shrink-0 p-0 relative transition-all duration-300 ${format === "seeker" ? "w-[265px] group" : "w-[320px]"}`}>
                                        <CardTitle className={`flex items-center justify-center gap-2 absolute bg-background py-2 px-4 rounded-4xl top-5 left-4 text-sm ${format === "seeker" ? "group-hover:bg-teal-100" : ""}`}>
                                            <Icon className={'size-5'} />
                                            {service.title}
                                        </CardTitle>
                                        <CardContent className={'p-0'}>
                                            {/* <div className={`flex items-center justify-center gap-2 absolute bg-background py-2 px-4 rounded-4xl text-sm ${format === "seeker" ? "bottom-5 right-4 group-hover:bg-teal-100" : "hidden"} `}>
                                                <UsersRound className={'size-4'} />
                                                {service.providerCount} <span>Providers</span>
                                            </div> */}
                                            <img
                                                className={`object-cover w-full rounded-2xl ${format === "seeker" ? "h-[270px] w-auto" : "h-[500px]"}`}
                                                src={service?.images[0]?.url || "/placeholder.svg"}
                                                alt={service?.title || "Service Image"}
                                            />

                                        </CardContent>
                                    </Card>
                                </Link>
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





