import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Hammer, MessageCircleQuestion,Star, Calendar  } from 'lucide-react';
import { getAllFeedbacks } from '../../redux/slices/feedbackSlice';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function Feedbacks() {
  const [isReviews, setIsReviews] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [])
  const { feedbacks, isLoading } = useSelector(state => state.feedbackSlice);
  console.log(feedbacks)
  const platformReviews = feedbacks.filter(feedback => feedback.messageType === "platformReview")
  const supportfeedbacks = feedbacks.filter(feedback => feedback.messageType === "support")

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
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 lg:gap-6">
        <div className="">
          <AdminSidebar />
        </div>

        <section className="lg:min-h-[calc(100vh-82px)]  w-full m-0 gap-4 p-0">
          <div className='flex justify-between flex-wrap gap-2 items-center px-2'>
            <h2 className="text-xl lg:text-3xl mr-auto text-slate-900  flex items-center gap-2 mb-1">
              <Hammer className="lg:size-8 size-6 text-primary" />
              All User Feedbacks
            </h2>
          </div>
          <div>
            <div className={`relative shadow-sm border w-full lg:md:max-w-[95%] rounded-4xl mr-12 text-center flex items-center mb-[2rem] transition-all duration-100 bg-violet-200`}>
              <div className={`absolute left-0 rounded-3xl mx-2 w-[50%] h-11 transition-all duration-300 bg-primary ${isReviews ? 'translate-x-[96%]' : ''}`}></div>
              <h3 onClick={() => setIsReviews(false)} className={`z-10 cursor-pointer p-4 w-[50%] ${isReviews ? "" : 'text-background'}`}>Support & Help</h3>
              <h3 onClick={() => setIsReviews(true)} className={`z-10 p-4 w-[50%] cursor-pointer ${isReviews ? "text-background" : 'text-foreground'}`} >Platform Reviews</h3>
            </div>
          </div>
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mr-12 lg:ml-6'>
            {feedbacks?.length > 0
              ? isReviews
                ? platformReviews.map(review => (
                  <Card className={`relative w-full max-w-2xl py-0 `}>
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
                          <div className="flex gap-2 pt-1">
                            <Badge className={`ml-4  text-black ${review?.role === "provider" ? "bg-accent" : "bg-secondary"} `}>
                              {review.role}
                            </Badge>
                          </div>

                        </div>
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed text-sm">{review.message}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center text-sm text-gray-500 pt-2 border-t border-gray-100 ">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{handleDateAndTimeFormat(review.createdAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
                : supportfeedbacks.map(review => (
                  <Card className={`relative w-full max-w-2xl py-0 `}>
                    <CardContent className="p-3 px-5 flex flex-col justify-between h-full">
                      {/* Header with customer info and rating */}
                      <div className="flex items-start justify-between mb-4">
                        <div className='px-1'>
                          <h3 className="font-semibold text-gray-900">
                            {review.name}, <span className={`italic font-medium text-sm ${review.role === "provider" ? "text-accent" : "text-secondary"}`}> A {review.role === "seeker" ? "Customer" : review.role} of Servana</span>
                          </h3>
                        </div>
                        <div className="flex gap-2 pt-1">
                          {/* <Badge className={`ml-4  text-black ${review?.role === "provider" ? "bg-accent" : "bg-secondary"} `}>
                        </Badge> */}
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed text-sm flex gap-2">
                            <MessageCircleQuestion className='size-6 text-primary' />
                            {review.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100 ">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-4 w-4" />
                          <span>{handleDateAndTimeFormat(review.createdAt)}</span>
                        </div>
                        <a href={`mailto:${review.email}`} className='text-white bg-primary hover:bg-violet-800 p-1 px-4 rounded-3xl'>Reply</a>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : <h2 className='lg:col-span-3 text-center py-20 text-xl lg:text-3xl leading-6 lg:leading-10'>Failed to Retrive All Feedbacks From Server at the moment.<br /> plase Try again Later</h2>
            }
          </div>
        </section>
      </main >
    </>
  )
}

export default Feedbacks