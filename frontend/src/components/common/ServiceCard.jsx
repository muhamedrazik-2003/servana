import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ClipboardList, MapPin, Star, UsersRound } from "lucide-react";
import { CardAction, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const ServiceCard = ({ variant = "seeker", data }) => {

    const renderContent = () => (
        <div className="flex flex-col">
            {/* Image */}
            <div className="w-full md:h-auto">
                <Carousel>
                    <CarouselContent>
                        {data?.images.map(image => (
                            <CarouselItem>
                                <img
                                    src={image?.url || "/placeholder.jpg"}
                                    alt={image?.public_id}
                                    className={`w-full h-auto object-cover rounded-3xl p-2 ${variant === "provider" ? "aspect-video" : "aspect-square"}`}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=' !left-3 size-6 bg-orange-400' />
                    <CarouselNext className=' !right-3 size-6 bg-orange-400' />
                </Carousel>

            </div>

            <CardContent className="px-4 pt-0 pb-4 space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle>{data?.title}</CardTitle>
                    <CardAction className={'flex items-center gap-1 text-lg'}>{data?.avgRating} <Star className="fill-yellow-400 text-yellow-400 size-5" /></CardAction>
                </div>

                <CardDescription className={'text-teal-600'}>{data?.category}</CardDescription>

                <div className={`flex justify-between ${variant === "seeker" ? "flex-col items-start" : "items-center"}`}>
                    {variant === "provider" ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ClipboardList className="size-4" />
                            Bookings: {data?.totalBookings}
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <UsersRound className="size-4" />
                                {data?.providerId?.fullName}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="size-4" />
                                    {`${data?.location?.city}, ${data?.location?.state}, ${data?.location?.pincode}`}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <p className="text-primary text-sm font-semibold">Starting From ₹{data?.price}</p>
            </CardContent>

            {variant === "provider"
                && <CardFooter className={'gap-2 justify-end px-2'}>
                    <Link to={`/provider/services/update/${data?._id}`}>
                        <Button variant="outline2" size='sm' className='w-full lg:w-auto hover:bg-accent hover:border-accent'>
                            Edit Service
                        </Button>
                    </Link>
                    <Link to={`/provider/services/${data?._id}`}>
                        <Button variant="" size='sm' className='w-full lg:w-auto'>
                            View Details
                        </Button>
                    </Link>

                </CardFooter>
            }
        </div>
    );


    return (
        <Card className={`relative grid grid-cols-1 gap-0 py-0 rounded-3xl rounded-b-2xl shadow-none border-0 bg-background transition ${variant === "provider" ? "hover:bg-orange-100 border-2 pb-3" : "hover:bg-teal-100"}`} >
            {variant === "seeker" ? (
                <Link to={`/seeker/services/${data?._id}`}>
                    {renderContent()}
                </Link>
            ) : (
                <div className="cursor-default">
                    {renderContent()}
                </div>
            )}
        </Card>

    );
};

export default ServiceCard;
