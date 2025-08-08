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
import { optimizeImage } from '../../lib/utils'
import ServiceCategorySkelton from '../skeltons/ReviewCardSkelton'
import { Skeleton } from "@/components/ui/skeleton"

function ServiceCategory({ format }) {
    const containerRef = useRef()
    const dispatch = useDispatch();
    // console.log(services)
    useEffect(() => {
        dispatch(getSampleServices());
    }, [])
    const { servicesBackup, isLoading, sampleServices } = useSelector(state => state.serviceSlice);
    let topServices = []
    if (servicesBackup.length > 0) {
        topServices = [... servicesBackup]?.sort((a, b) => b.totalBookings - a.totalBookings);
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
        <section id='categories' className={`mx-0 pl-[24px] md:pl-15 lg:pl-[100px] ${format === "seeker" && "pb-10"}`}>
            <div className='flex flex-col md:flex-row justify-between md:items-center pr-8 mb-10'>
                <div>
                    <h2 className={`max-w-[600px] ${format === "seeker" && "text-2xl md:text-4xl mb-1"}`}>{format === "seeker" ? "Popular Services Near You" : "Services That Simplify Everyday Life."}</h2>
                    <p className={`${format === "seeker" && "text-base mb-0"}`}>{format === "seeker" ? "Find what others are booking most around your area." : 'Servana connects you with nearby experts—fast, reliable, and verified.'}</p>
                </div>
                <Link to={'/seeker/services'}>
                    <Button variant={'outline'} className={`border ml-auto mb-0 md:mr-[32px] lg:mr-[76px] ${format === "seeker" ? "block" : "hidden"}`}>View More</Button>
                </Link>
            </div>
            <div ref={containerRef} className='scroll-smooth overflow-x-auto scrollbar-none ml-[-100px] pl-[100px] scrolllbar-hidden'>
                <div className='flex gap-5'>
                    {isLoading
                       ? [1,2,3,4,5,6,7,8].map((skelton, index) => (
                        <Skeleton key={index} className={`shrink-0 ${format === "seeker" ? "w-66 h-66 group" : "w-80 h-125"}`}/>
                       ))
                       : topServices.length > 0
                            ? topServices?.slice(0, 8).map((service, index) => {
                                return (
                                    <Link key={index} to={`/seeker/services/${service._id}`} className={`${format === "seeker" ? "" : "pointer-events-none"}`}>
                                        <Card className={`shrink-0 p-0 relative transition-all duration-300 ${format === "seeker" ? "w-[265px] group" : "w-[320px]"}`}>
                                            <CardTitle className={`flex items-center whitespace-nowrap gap-2 absolute bg-background py-2 px-4 rounded-4xl top-5 left-[50%] -translate-x-[50%] text-sm ${format === "seeker" ? "group-hover:bg-teal-100" : ""}`}>
                                                {service.title}
                                            </CardTitle>
                                            <CardContent className={'p-0'}>
                                                {/* <div className={`flex items-center justify-center gap-2 absolute bg-background py-2 px-4 rounded-4xl text-sm ${format === "seeker" ? "bottom-5 right-4 group-hover:bg-teal-100" : "hidden"} `}>
                                                <UsersRound className={'size-4'} />
                                                {service.providerCount} <span>Providers</span>
                                            </div> */}
                                                <img
                                                    className={`object-cover w-full rounded-2xl ${format === "seeker" ? "h-[265px] w-auto" : "h-[500px]"}`}
                                                    src={optimizeImage(service?.images[0]?.url) || "/placeholder.svg"}
                                                    alt={service?.title || "Service Image"}
                                                />

                                            </CardContent>
                                        </Card>
                                    </Link>
                                )
                            })
                            : <h2 className='md:col-span-2 lg:col-span-3 text-center py-20 text-xl lg:text-3xl leading-6 lg:leading-10'>You don’t have any <span className='text-primary'>Recommended</span><br />  services at the moment.</h2>

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





