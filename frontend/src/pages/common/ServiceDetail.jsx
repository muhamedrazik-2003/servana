import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "../../components/common/Footer";
import { ClipboardList, CreditCard, MapPin, MessageSquare, Star } from "lucide-react";
import SeekerHeader from "../../components/seeker/common/SeekerHeader";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "../../components/ui/badge";
import { getStatusClass } from "../../lib/utils";

const ServiceDetail = () => {
  const { pathname } = useLocation();
  const { serviceId } = useParams();

  let role = ""

  if (pathname.includes('/provider')) {
    role = "provider"
  } else if (pathname.includes('/admin')) {
    role = "admin"
  } else {
    role = "seeker"
  }

  const { services, isLoading, } = useSelector(state => state.serviceSlice);
  const currentService = services.find(service => service._id === serviceId);
  console.log(currentService)

  const summaryItems = [
    {
      title: "Total Bookings",
      value: `${currentService.totalBookings > 0 ? currentService.totalBookings : "Not Available"}`,
      icon: <ClipboardList className="text-primary size-6" />,
    },
    {
      title: "Total Reviews",
      value: `${currentService.totalReviews > 0 ? currentService.totalReviews : "Not Available"}`,
      icon: <MessageSquare className="text-primary size-6" />,
    },
    {
      title: "Average Rating",
      value: `${currentService.avgRating > 0 ? currentService.avgRating : "Not Available"}`,
      icon: <Star className="text-yellow-400 size-6" />,
    },
  ];
  return (
    <main>
      <SeekerHeader />
      <section className="mx-auto px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 py-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Service Header */}
          <div className="space-y-2">
            <h1 className="text-4xl text-start">{currentService.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs">Cleaning</span>
              {role === "seeker"
                && <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/provider.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
              }
              <span className="text-yellow-500">
                {'★'.repeat(Math.round(currentService?.avgRating || 0))}☆ ({currentService?.totalReviews} reviews)
              </span>

              {role === "seeker"
                ? <p className="font-medium flex items-center gap-2">
                  <MapPin className="size-4.5" />
                  From {`${currentService.location.city}, ${currentService.location.state}, ${currentService.location.pincode}`}
                </p>
                : <Badge className={getStatusClass(currentService.status)}>{currentService.status}</Badge>

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
                  <img src={img} alt={`Service ${i}`} className="w-full h-72 rounded-3xl object-cover" />
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
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Verified Cleaner from Kozhikode</p>
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
            {summaryItems.map((item, index) => (
              <div className="flex items-center gap-4 border rounded-3xl py-5 px-6">
                <div className="rounded-full">{item.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-xl font-semibold text-primary">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-15">
              <Link to={`/provider/services/update/${currentService._id}`}>
                <Button className='w-full'>Edit This Service</Button>
              </Link>
              <Button variant='destructive' className='w-full'>Delete This Service</Button>
              <Button variant='outline2' className='w-full border-accent text-black hover:bg-accent hover:border-accent'>Disable This Service</Button>
            </div>

          </div>
          :

          <div className="space-y-4 sticky top-20 h-fit bg-teal-50 border rounded-3xl shadow p-5">
            <h3 className="text-lg font-semibold text-center">Book This Service</h3>

            <div className="space-y-2 flex flex-col items-center">
              <label className="block text-sm font-medium">Select Date</label>
              <Calendar mode="single" selected={new Date()} className="border rounded-3xl bg-teal-50" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Preferred Time</label>
              <select className="w-full px-3 py-2 border rounded-md text-sm">
                <option value="">Select Time</option>
                <option value="9-11">9 AM – 11 AM</option>
                <option value="12-2">12 PM – 2 PM</option>
                <option value="3-5">3 PM – 5 PM</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Special Instructions</label>
              <Textarea placeholder="Add any notes for the provider..." />
            </div>

            <div className="text-sm text-muted-foreground">
              Total Price: <span className="font-semibold text-foreground">₹1499</span>
              <span className="text-xs block text-accent">(Amount Can increse Based on Job Details)</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Payment Mode: <span className="font-semibold text-foreground">Cash</span>
              <span className="text-xs block text-accent">(Online Payment is Currently Unavailable)</span>
            </div>

            <Button className="w-full">Book Now</Button>

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
