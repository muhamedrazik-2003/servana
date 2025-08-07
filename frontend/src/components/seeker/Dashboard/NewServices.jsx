import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MapPin, Star, Users, UsersRound } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Link } from "react-router-dom"
import { Button } from "../../ui/button"
import { useSelector } from "react-redux"
import { optimizeImage } from "../../../lib/utils"
import ServiceCardSkelton from "../../skeltons/ServiceCardSkelton.jsx"

function NewServices() {
    const { services, isLoading } = useSelector(state => state.serviceSlice);

    const newAddedServices = [...services]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    // console.log(newAddedServices)
    return (
        <section className="mt-10 space-y-5 pb-10">
            <div className='flex flex-col md:flex-row justify-between md:items-center lg:pr-8 mb-10'>
                <div>
                    <h2 className='text-2xl md:text-4xl mb-1'>Fresh Services Just for You</h2>
                    <p className='text-base mb-10'>We’ve got some new arrivals! Check out what’s fresh in your area.</p>
                </div>
                <Link to={'/seeker/services'} className="ml-auto">
                    <Button variant={'outline'} className={`border mb-0`}>View More</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {isLoading
                ? <ServiceCardSkelton/>
                : newAddedServices?.length > 0
                    ? newAddedServices?.slice(0, 8).map(service => (
                        <Link key={service.id} to={`/seeker/services/${service?._id}`}>
                            <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
                                <img
                                    src={optimizeImage(service.images[0].url)}
                                    alt={service.title}
                                    className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
                                />
                                <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>New Services</Badge>
                                <CardContent className="px-4 pt-0 pb-4 space-y-1">
                                    <div className="flex items-center justify-between my-1">
                                        <CardTitle className='max-w-[80%] leading-5'>{service?.title}</CardTitle>
                                        <CardAction className={'flex items-center gap-1 text-lg'}>{service?.avgRating} <Star className="fill-yellow-400 text-yellow-400 size-5" /></CardAction>
                                    </div>

                                    <CardDescription className={'text-teal-600'}>{service?.category}</CardDescription>

                                    <div className={`flex justify-between flex-col items-start`}>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <UsersRound className="size-4" />
                                            {service?.providerId?.fullName}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="size-4" />
                                                {`${service?.location?.city}, ${service?.location?.state}, ${service?.location?.pincode}`}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-primary text-sm font-semibold">Starting From ₹{service?.price}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                    : <h2 className='md:col-span-2 lg:col-span-4 text-center py-15 text-xl lg:text-3xl leading-6 lg:leading-10'>Currently no <span className="text-primary"> New</span> Services<br /> Are Available at the moment</h2>

                }
            </div>
        </section>
    )
}

export default NewServices