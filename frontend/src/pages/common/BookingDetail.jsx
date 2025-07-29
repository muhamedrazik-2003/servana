import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { CalendarIcon, CreditCard, Hash, IndianRupee, Mail, MapPin, MessageCirclePlus, PhoneCall, Star, Timer } from "lucide-react";
import Footer from "../../components/common/Footer";
import SeekerHeader from "../../components/seeker/common/SeekerHeader";
import { useLocation, useParams } from "react-router-dom";
import ProviderHeader from "../../components/provider/common/ProviderHeader";
import { useSelector } from "react-redux";

const BookingDetail = () => {
  const { pathname } = useLocation();
  const { bookingId } = useParams();
  let role = ""

  if (pathname.includes('/provider')) {
    role = "provider"
  } else if (pathname.includes('/admin')) {
    role = "admin"
  } else {
    role = "seeker"
  }
  const { bookings } = useSelector(state => state.bookingSlice);
  // console.log(bookings)
  const currentBooking = bookings.find(booking => booking._id === bookingId);

  const getBookingProgress = (status) => {
    if (status === "pending") {
      return 3
    } else if (status === "ongoing") {
      return 50
    } else if (status === "completed") {
      return 100
    }
  }
  const getPaymentStatus = (status) => {
    if (status === "pending") {
      return "text-red-500"
    } else if (status === "paid") {
      return "text-green-500"
    } else {
      return "text-gray-700"
    }
  }
  return (
    <main>
      {role === "provider"
        ? <ProviderHeader />
        : <SeekerHeader />
      }
      <div className="max-w-6xl mx-auto px-6 lg:px-4 py-8 space-y-8">
        <div className="grid grid-col-1 lg:grid-cols-[1fr_auto] gap-6">
          {/* service section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Service Info</h3>
              <div className="space-y-2">
                <h1 className="text-4xl text-start">{currentBooking?.serviceId?.title || 'Not Available'}</h1>
                <p className="flex gap-2 items-center" ><MapPin className="size-5" />{currentBooking?.serviceId?.location?.city + ", " + currentBooking?.serviceId?.location?.state + ", " + currentBooking?.serviceId?.location?.pincode || 'Not Available'}</p>
                <div className="flex gap-4">
                  <p className="flex gap-2 items-center"><CalendarIcon className="size-5" />{currentBooking?.scheduledDate.slice(0, 10) || 'Not Available'}</p>
                  <p className="flex gap-2 items-center"> <Timer className="size-5" />{currentBooking?.scheduledTime || 'Not Available'}</p>
                </div>
              </div>
            </div>
            {/* provider info or seeker info */}
            {role === "provider"
              ? <>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">Booking Info</h3>
                  <div className="space-y-2">
                    <p className="flex gap-2 items-center" ><Hash className="size-5 text-accent" />Booking ID : {currentBooking?._id || 'Not Available'}</p>
                    <p className="flex gap-2 items-center" ><IndianRupee className="size-5" /> Service Price : <span>{currentBooking?.totalPrice || 'Not Available'}</span></p>
                    <p className="flex gap-2 items-center" ><CreditCard className="size-5" /> Patment Status : <span className={getPaymentStatus(currentBooking?.paymentStatus || "Not Available")}>{currentBooking?.paymentStatus || 'Not Available'}</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">Customer Info</h3>
                  <div className="space-y-2">
                    <h1 className="text-3xl text-start">{currentBooking?.seekerId?.fullName || 'Not Available'}</h1>
                    <p className="flex gap-2 items-center" ><MapPin className="size-5" />{currentBooking?.seekerId?.location?.city + ", " + currentBooking?.seekerId?.location?.state + ", " + currentBooking?.seekerId?.location?.pincode || 'Not Available'}</p>
                    <div className="flex gap-4 mt-5">
                      <a href={`tel:${currentBooking?.seekerId?.phone}`}>
                        <Button size='sm'><PhoneCall />Contact Customer</Button>
                      </a>
                      <a href={`mailto:${currentBooking?.seekerId?.email}`}>
                      <Button size='sm'><Mail /> Message Customer</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </>

              : <div>
                <h3 className="text-lg font-semibold text-primary mb-1">Provider Info</h3>
                <div className="space-y-2">
                  <h1 className="text-3xl text-start">{currentBooking?.providerId?.fullName || 'Not Available'}</h1>
                  <p className="flex gap-2 items-center" ><MapPin className="size-5" />{currentBooking?.providerId?.location?.city + ", " + currentBooking?.providerId?.location?.state + ", " + currentBooking?.providerId?.location?.pincode || 'Not Available'}</p>
                  {/* <p className="flex gap-2 items-center" >
                    <Star className="size-5" />
                    <Star className="size-5" />
                    <Star className="size-5" />
                    <Star className="size-5" />
                    <span className="text-teal-500">(20 reviews)</span>
                  </p> */}
                  <div className="flex gap-4 mt-5">
                      <a href={`tel:${currentBooking?.providerId?.phone}`}>
                    <Button size='sm'><PhoneCall />Contact Provider</Button>
                    </a>
                      <a href={`mailto:${currentBooking?.providerId?.phone}`}>
                    <Button size='sm'><Mail /> Message Provider</Button>
                    </a>
                  </div>
                </div>
              </div>
            }
            {/* notes card */}
            <Card className="rounded-3xl py-4 gap-0 mt-6">
              <CardHeader>
                <h3 className="text-lg text-primary mb-1">Provided Instructions</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{currentBooking?.seekerNotes || 'Not Available'}</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            {/* Image Carousel */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Service Images</h3>
              <Carousel className="w-full max-w-2xl">
                <CarouselContent>
                  {currentBooking?.serviceId?.images?.map((image, i) => (
                    <CarouselItem key={i} className=" overflow-hidden">
                      <img src={image?.url} alt={`Service ${i}`} className="w-full aspect-5/3 rounded-3xl object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious variant='outline2' />
                <CarouselNext variant='outline2' />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-primary">Booking Progress</h3>
          <div className="space-y-3">
            <Progress value={getBookingProgress(currentBooking.bookingStatus)} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={`${currentBooking.bookingStatus === "pending" ? "text-teal-500 font-medium" : ""}`}>Requested</span>
              {/* <span className="text-teal-500 font-medium">Confirmed</span> */}
              <span className={`${currentBooking.bookingStatus === "ongoing" ? "text-teal-500 font-medium" : ""}`}>In Progress</span>
              <span className={`${currentBooking.bookingStatus === "completed" ? "text-teal-500 font-medium" : ""}`}>Completed</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-primary mb-2">Actions</h3>
          <div className=" space-x-3 space-y-2">
            <Button variant="destructive" className="w-full lg:w-45">Cancel Booking</Button>
            {role === "seeker"
              && <Button variant="outline2" className="w-full lg:w-45">Reschedule</Button>
            }
            <Button className="w-full lg:w-45" disabled>Mark as Completed</Button>
          </div>
        </div>
        <div className="py-3 mb-10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary mb-1">Service Reviews</h3>
            {role === "seker"
              && <Button variant='outline2' size='sm'>
                <MessageCirclePlus />
                Add A Review
              </Button>
            }

          </div>
          <p className="text-sm text-gray-600">Reviews From other users who previously booked this service</p>
          <div>
            <p>current No Reviews Available</p>
          </div>
        </div>
      </div>
      <Footer userRole={'seeker'} />
    </main>
  );
};

export default BookingDetail;