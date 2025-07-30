import React, { useEffect } from 'react'
import ReviewDialog from './ReviewDialog'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from 'react-redux';
import { getServiceReviews } from '../../redux/slices/reviewSlice';
import { MapPin, Star, StarOff } from 'lucide-react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


function ReviewSection({ role, serviceId, page }) {
    console.log(serviceId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServiceReviews(serviceId))
    }, [])
    const { reviews } = useSelector(state => state.reviewSlice)
    console.log(reviews)

    function handleRating(rating) {
        const fullStars = rating;
        const emptyStars = 5 - fullStars;

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star className="text-yellow-400 size-4" fill="currentColor" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<StarOff className="text-gray-300 size-4" />);
        }
        return <div className="flex gap-0.5">{stars}</div>;
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <div className='mb-3'>
                    <h2 className={` font-semibold mb-0 ${page === "booking" ? "text-primary text-lg" : "text-xl"} `}>Customer Reviews</h2>
                    <p className="text-sm text-gray-600">Reviews From other users who previously booked this service</p>
                </div>
                {role === "seeker" && page === "booking"
                    && <ReviewDialog />
                }
            </div>
            <div className={`space-y-4 ${page === "booking" ? "grid grid-cols-2" : ""}`}>
                {
                    reviews.length > 0
                    ? reviews?.map((review, index) => (
                    <>
                        <div key={index} className="border py-5 px-6 rounded-3xl shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div className='flex items-center gap-2'>
                                    <Avatar className="size-8">
                                        <AvatarImage src={`${review.seekerId?.profilePicture}`} />
                                        <AvatarFallback>NA</AvatarFallback>
                                    </Avatar>
                                    <div className='font-semibold'>{review.seekerId?.fullName}</div>
                                    <div className='text-sm text-muted-foreground flex items-center gap-2'>
                                        <MapPin className='size-4' /> {review.seekerId?.location?.city}, {review.seekerId?.location?.state}
                                    </div>
                                </div>
                                <div>{handleRating(review.rating)}</div>

                            </div>

                            <div className="text-sm text-primary px-2">
                                “{review.comment}”
                            </div>
                        </div>
                    </>
                ))
                : <h2 className='text-center text-3xl py-4'>Currently, there are no reviews available.</h2>
                }
            </div>
        </>
    )
}

export default ReviewSection