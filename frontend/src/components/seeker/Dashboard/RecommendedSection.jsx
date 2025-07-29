import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";


function RecommendedSection() {

    const { services, isLoading } = useSelector(state => state.serviceSlice);

    const recommendedServices = services.filter(service =>
        service.totalBookings > 4 && service.rating >= 3
    );

    console.log(recommendedServices)
    return (
        <section className="mt-10 space-y-5 pb-10">
            <div className='flex justify-between items-end md:items-center mb-10'>
                <div>
                    <h2 className='text-2xl md:text-4xl mb-1'>Recommended for You</h2>
                    <p className='text-base mb-10'>Services you may want to explore.</p>
                </div>
                <Link to={'/seeker/services'}>
                    <Button variant={'outline'} className={`border ml-auto mb-0`}>View More</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {recommendedServices?.length > 0
                    ? recommendedServices.slice(0, 8).map(service => (
                        <Card key={service.id} className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
                            />
                            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
                            <CardContent className="px-4 pt-0 pb-6">
                                <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">{service.title}</h3>
                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {service.location}
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Users className="w-3.5 h-3.5" />
                                    {service.providerCount} providers available
                                </div>
                            </CardContent>
                        </Card>
                    ))

                    : <h2 className='md:col-span-2 lg:col-span-4 text-center py-15 text-3xl leading-10'>Currently no <span className="text-primary">recommended</span> Services<br /> Are Available at the moment</h2>
                }
            </div>
        </section>
    )
}

export default RecommendedSection