import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star, StarOff } from 'lucide-react';
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedbacks } from "../../../redux/slices/feedbackSlice";
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Hash, Flag } from "lucide-react"
import ReviewCardSkelton from "../../skeltons/ReviewCardSkelton";


function Testimonial() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [])
  const { feedbacks, isFeedbackLoading } = useSelector(state => state.feedbackSlice);
  console.log(feedbacks)

  const seekerPlatformReviews = feedbacks.filter(feedback => feedback.messageType === "platformReview" && feedback.role === "seeker")
  const providerPlatformReviews = feedbacks.filter(feedback => feedback.messageType === "platformReview" && feedback.role === "provider")

  const duplicatedSeekerReviews = useMemo(() => [...seekerPlatformReviews, ...seekerPlatformReviews], [seekerPlatformReviews])
  const duplicatedProviderReviews = useMemo(() => [...providerPlatformReviews, ...providerPlatformReviews], [providerPlatformReviews])
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }
  const handleDateAndTimeFormat = (bookingDate) => {
    return new Date(bookingDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: '2-digit',
      hour12: true
    });
  }
  const scrollTrackTotalWidthProvider = duplicatedProviderReviews.length * 340 + (24 * duplicatedProviderReviews.length);
  const scrollTrackTotalWidthSeeker = duplicatedSeekerReviews.length * 340 + (24 * duplicatedSeekerReviews.length);

  return (
    <section className='mx-0 pl-[32px] lg:pl-[100px]'>
      <h2 className='max-w-[600px]'>Made for Local Service. Built for Trust.</h2>
      <p className='mb-[72px]'>We remove the friction so customers and providers can focus on what truly matters—results and relationships.</p>
      <h5 className="py-1.5 px-4 rounded-4xl mb-4 bg-secondary inline-block text-sm">Customer's Comment</h5>
      <div className='scroll-smooth overflow-x-auto scrollbar-none lg:ml-[-100px] flex'>
        <div className='flex gap-6 pl-6 hover:[animation-play-state:paused]' style={{ width: `${scrollTrackTotalWidthSeeker}px`, animation: `animatedScrollSeeker ${scrollTrackTotalWidthSeeker / 200}s linear infinite` }}>
          {isFeedbackLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map(skelton => (
              <ReviewCardSkelton/>
            ))
            : duplicatedSeekerReviews.map(review => (
              <Card className={`relative w-[340px] shrink-0 py-0 `}>
                {/* {userRole === "admin"
                    && <p className={`absolute top-14 right-12 text-red-500 text-xs font-bold flex gap-2 bg-black p-1 px-4 rounded-full ${review.status !== "active" ? "block" : "hidden"}`} >Review {review?.status}</p>
                  } */}
                <CardContent className="p-3 px-5 flex flex-col justify-between h-full">
                  {/* Header with customer info and rating */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {review.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                              <span className="text-sm text-gray-600">({review.rating}/5)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex gap-2 pt-1">
                        <Badge className={`ml-4  text-black ${review?.role === "provider" ? "bg-accent" : "bg-secondary"} `}>
                          {review.role}
                        </Badge>
                      </div> */}

                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed text-sm">{review.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center text-xs text-primary pt-2 border-t border-gray-100 ">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{handleDateAndTimeFormat(review.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>
      <div className="text-right pr-[32px] lg:pr-[120px]">
        <h5 className="py-1.5 px-4 rounded-4xl my-4 bg-accent inline-block text-sm">Provider's Comment</h5>
      </div>
      <div className='scroll-smooth overflow-x-auto scrollbar-none lg:ml-[-100px] scrolllbar-hidden'>
        <div className='flex gap-6 pl-6' style={{ width: `${scrollTrackTotalWidthProvider}px`, animation: `animatedScollProvider ${scrollTrackTotalWidthProvider / 200}s linear infinite` }}>
          {isFeedbackLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map(skelton => (
              <ReviewCardSkelton/>
            ))
            : duplicatedProviderReviews.map(review => (
              <Card className={`relative w-[340px] shrink-0 py-0 `}>
                {/* {userRole === "admin"
                    && <p className={`absolute top-14 right-12 text-red-500 text-xs font-bold flex gap-2 bg-black p-1 px-4 rounded-full ${review.status !== "active" ? "block" : "hidden"}`} >Review {review?.status}</p>
                  } */}
                <CardContent className="p-3 px-5 flex flex-col justify-between h-full">
                  {/* Header with customer info and rating */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {review.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                              <span className="text-sm text-gray-600">({review.rating}/5)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex gap-2 pt-1">
                        <Badge className={`ml-4  text-black ${review?.role === "provider" ? "bg-accent" : "bg-secondary"} `}>
                          {review.role}
                        </Badge>
                      </div> */}

                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed text-sm">{review.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center text-xs text-primary pt-2 border-t border-gray-100 ">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{handleDateAndTimeFormat(review.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Testimonial