import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "../../components/common/Footer";
import { ClipboardList, CreditCard, LoaderCircle, MapPin, MessageSquare, Star } from "lucide-react";
import SeekerHeader from "../../components/seeker/common/SeekerHeader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../../components/ui/badge";
import { getStatusClass } from "../../lib/utils";
import { deleteService } from "../../redux/slices/serviceSlice";
import { toast } from "sonner";
import { addNewBooking } from "../../redux/slices/bookingSlice";
import { startOfToday } from "date-fns/startOfToday";
import { isBefore } from "date-fns/isBefore";

const ServiceDetail = () => {
  const { pathname } = useLocation();
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let role = ""

  if (pathname.includes('/provider')) {
    role = "provider"
  } else if (pathname.includes('/admin')) {
    role = "admin"
  } else {
    role = "seeker"
  }

  const { services, isDeleting, isUpdating } = useSelector(state => state.serviceSlice);
  const {isBooking} = useSelector(state => state.bookingSlice)
  const currentService = services.find(service => service._id === serviceId);
  const [bookingData, setBookingData] = useState({
    serviceId,
    providerId: currentService?.providerId,
    scheduledDate: "",
    scheduledTime: "",
    seekerNotes: "",
    duration: 1,
    durationUnit: "hour",
    location: {
      city: "",
      state: "",
      pincode: ""
    }
  })
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!currentService || !currentService.price || !currentService.priceUnit) return;

    const duration = Number(bookingData.duration); // Ensure it's a number

    let total = 0;

    if (
      (currentService?.priceUnit === "hour" && bookingData?.durationUnit === "hour") ||
      (currentService?.priceUnit === "day" && bookingData?.durationUnit === "day")
    ) {
      total = currentService.price * duration;
    } else if (currentService?.priceUnit === "hour" && bookingData?.durationUnit === "day") {
      total = currentService.price * (duration * 24);
    } else if (currentService?.priceUnit === "day" && bookingData?.durationUnit === "hour") {
      total = (currentService.price / 24) * duration;
    } else if (currentService?.priceUnit === "service") {
      total = currentService.price
    }

    setTotalPrice(Math.round(total)); // Optionally round it
  }, [bookingData.duration, bookingData.durationUnit, currentService]);


  // seeker Side 
  const userSplited = currentService?.providerId?.fullName?.trim().split(" ") || [];
  const firstInitial = userSplited[0]?.[0] || "";
  const secondInitial = userSplited[1]?.[0] || "";

  const providerProfileFallback = (firstInitial + secondInitial).toUpperCase();

  const handleBooking = async () => {
    try {
      console.log(bookingData);
      const { scheduledDate, scheduledTime, location: { city, state, pincode } } = bookingData;
      const updatedBookingData = {...bookingData, totalPrice}
      if (!scheduledDate || !scheduledTime || !city || !state || !pincode) return toast.warning("Please Add All required Fields");

      const response = await dispatch(addNewBooking(updatedBookingData));
      if (addNewBooking.fulfilled.match(response)) {
        toast.success("Booking Successfull");
        setBookingData({
          serviceId,
          providerId: currentService?.providerId,
          scheduledDate: "",
          scheduledTime: "",
          seekerNotes: "",
          duration: 1,
          durationUnit: "hour",
          location: {
            city: "",
            state: "",
            pincode: ""
          }
        })
        console.log(response.payload)
        navigate(`/seeker/mybookings/${response.payload.bookingList?._id}`)
        return;
      } else if (addNewBooking.rejected.match(response)) {
        return toast.error(response.payload?.message || "Something went wrong while booking the service");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  // Provider Side
  const summaryItems = [
    {
      title: "Total Bookings",
      value: `${currentService?.totalBookings > 0 ? currentService.totalBookings : "Not Available"}`,
      icon: <ClipboardList className="text-primary size-6" />,
    },
    {
      title: "Total Reviews",
      value: `${currentService?.totalReviews > 0 ? currentService.totalReviews : "Not Available"}`,
      icon: <MessageSquare className="text-primary size-6" />,
    },
    {
      title: "Average Rating",
      value: `${currentService?.avgRating > 0 ? currentService.avgRating : "Not Available"}`,
      icon: <Star className="text-yellow-400 size-6" />,
    },
  ];
  const handleDelete = async () => {
    const response = await dispatch(deleteService(serviceId));
    if (deleteService.fulfilled.match(response)) {
      toast.success("Service Delete successfully!");
      navigate('/provider/services');
      return;
    } else if (deleteService.rejected.match(response)) {
      return toast.error(response.payload?.message || "Something went wrong while Deleting the service");

    }
  }
  return (
    <main>
      <SeekerHeader />
      <section className="mx-auto px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 py-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Service Header */}
          <div className="space-y-2">
            <h1 className="text-4xl text-start">{currentService?.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs">Cleaning</span>
              {role === "seeker"
                && <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/provider.jpg" />
                    <AvatarFallback>{providerProfileFallback || 'US'}</AvatarFallback>
                  </Avatar>
                  <span>{currentService?.providerId?.fullName}</span>
                </div>
              }
              <span className="text-yellow-500">
                {'★'.repeat(Math.round(currentService?.avgRating || 0))}☆ ({currentService?.totalReviews} reviews)
              </span>

              {role === "seeker"
                ? <p className="font-medium flex items-center gap-2">
                  <MapPin className="size-4.5" />
                  From {`${currentService?.location?.city}, ${currentService?.location?.state}, ${currentService?.location?.pincode}`}
                </p>
                : <Badge className={getStatusClass(currentService?.status)}>{currentService?.status}</Badge>

              }

            </div>
            <span className="font-medium text-lg text-teal-600 flex items-center gap-2">
              <CreditCard className="size-5" />
              Starting from ₹{currentService?.price} / {currentService?.priceUnit}
            </span>


          </div>
          {/* Image Carousel */}
          <Carousel className="w-full max-w-2xl">
            <CarouselContent>
              {currentService?.images?.map((img, i) => (
                <CarouselItem key={i} className=" overflow-hidden">
                  <img src={img?.url} alt={`Service ${i}`} className="w-full h-72 rounded-3xl object-cover" />
                </CarouselItem>
              ))}

            </CarouselContent>
            <CarouselPrevious variant='outline2' />
            <CarouselNext variant='outline2' />
          </Carousel>

          {/* Overview */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-sm text-muted-foreground">
              {currentService?.description}
            </p>
          </div>

          {role === "seeker"
            && <div className="space-y-2">
              <h2 className="text-xl font-semibold">About the Provider</h2>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/provider.jpg" />
                  <AvatarFallback>{providerProfileFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentService?.providerId?.fullName}</p>
                  <p className="text-sm text-muted-foreground">Provider from {`${currentService?.location?.city}, ${currentService?.location?.state}, ${currentService?.location?.pincode}`}</p>
                </div>
              </div>
            </div>
          }

          {/* Service Info / Meta */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Service Info</h2>
            <ul className="text-sm text-muted-foreground list-disc pl-5">
              <li>Duration: Based on Work Quantity</li>
              <li>Mode: At Home</li>
              <li>Languages: English, Hindi, Malayalam</li>
              <li>Payment Modes: Cash</li>
              <li>Cancellation: Free before 24 hrs</li>
            </ul>
          </div>

          {/* Reviews */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              {role === "seeker"
                && <Button variant='outline2' className='border-2'>Add A Review</Button>
              }
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border p-3 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">Alex N.</p>
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Really satisfied with the service. Very professional and on-time!
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        {role === "provider"
          ? <div className="space-y-6 sticky top-24 h-fit p-5">
            {summaryItems?.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border rounded-3xl py-5 px-6">
                <div className="rounded-full">{item.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-xl font-semibold text-primary">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-15">
              <Link to={`/provider/services/update/${currentService?._id}`}>
                <Button className='w-full'>Edit This Service</Button>
              </Link>
              <Button disabled={isUpdating ? true : false} onClick={handleDelete} variant='destructive' className='w-full'>
                {isDeleting
                  ? <>
                    <LoaderCircle className="animate-spin" />"Deleting"
                  </>
                  : "Delete This Service"}
              </Button>
              <Button variant='outline2' className='w-full border-accent text-black hover:bg-accent hover:border-accent'>Disable This Service</Button>
            </div>

          </div>
          :

          <div className="space-y-4 sticky top-20 h-fit bg-teal-50 border rounded-3xl shadow p-5">
            <h3 className="text-lg font-semibold text-center">Book This Service</h3>

            <div className="space-y-2 flex flex-col items-center">
              <label className="block text-sm font-medium">Select Date</label>
              <Calendar
                mode="single"
                disabled={(date) => isBefore(date, startOfToday())}
                selected={bookingData.scheduledDate}
                onSelect={(date) => setBookingData({ ...bookingData, scheduledDate: date })}
                className="border rounded-3xl bg-teal-50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Preferred Time</label>
              <select onChange={(e) => setBookingData({ ...bookingData, scheduledTime: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm">
                <option value="">Select Time</option>
                <option value="9:00 AM">9 AM Onwards</option>
                <option value="12:00 AM">12 PM Onwards</option>
                <option value="3:00 PM">3 PM Onwards</option>
              </select>
            </div>
            {currentService?.priceUnit !== "service"
              && <div className="space-y-2">
                <label className="block text-sm font-medium">Service Duration</label>
                <div className="flex gap-2">
                  <Input defaultValue={bookingData?.duration} onChange={(e) => setBookingData({ ...bookingData, duration: e.target.value })} type="number" placeholder="1" />
                  <select onChange={(e) => setBookingData({ ...bookingData, durationUnit: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm">
                    <option value="hour" selected>Hour</option>
                    <option value="day">Day</option>
                    <option value="service">Flexible</option>
                  </select>
                </div>
              </div>
            }


            {/* 📍 Location Inputs */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">City</label>
              <Input onChange={(e) => setBookingData({ ...bookingData, location: { ...bookingData.location, city: e.target.value } })} type="text" placeholder="Enter your city" />
            </div>
            <div className="flex gap-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium">State</label>
                <Input onChange={(e) => setBookingData({ ...bookingData, location: { ...bookingData.location, state: e.target.value } })} type="text" placeholder="Enter your state" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Pincode</label>
                <Input onChange={(e) => setBookingData({ ...bookingData, location: { ...bookingData.location, pincode: e.target.value } })} type="text" placeholder="Enter your pincode" />
              </div>
            </div>


            <div className="space-y-2">
              <label className="block text-sm font-medium">Special Instructions</label>
              <Textarea onChange={(e) => setBookingData({ ...bookingData, seekerNotes: e.target.value })} placeholder="Add any notes for the provider..." />
            </div>


            {bookingData.durationUnit !== "service"
              && <div className="text-sm text-muted-foreground">
                Starting Price: <span className="font-semibold text-foreground">{`${currentService?.price} per ${currentService?.priceUnit}`}</span>
                <span className="text-xs block text-accent">(Amount Can increase Based on Service Duration)</span>
              </div>
            }
            <div className="text-sm text-muted-foreground">
              Total Price: <span className="font-semibold text-foreground">{totalPrice}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Payment Mode: <span className="font-semibold text-foreground">Cash</span>
              <span className="text-xs block text-accent">(Online Payment is Currently Unavailable)</span>
            </div>

            <Button onClick={handleBooking} disabled={isBooking ? true : false} className="w-full">
             {isBooking
                  ? <>
                    <LoaderCircle className="animate-spin" />"Booking..."
                  </>
                  : "Book This Service"}
              </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {/* <span className="font-medium text-foreground">Note:</span> Payment will only be requested after service completion. */}
            </p>


            <p className="text-xs text-muted-foreground text-center mt-2">
              🔒 Secure payment & free cancellation
            </p>
          </div>

        }
      </section>
      <Footer userRole={"seeker"} />
    </main>
  );
};

export default ServiceDetail;
