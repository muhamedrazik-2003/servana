import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import { CreditCard, MapPin } from "lucide-react";

const ServiceDetail = () => {
  return (
    <main>
      <Header />
      <section className="mx-auto px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 py-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Service Header */}
          <div className="space-y-2">
            <h1 className="text-3xl text-start">Deep Cleaning for Homes</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs">Cleaning</span>
              <div className="flex items-center gap-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/provider.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>John Doe</span>
              </div>
              <span className="text-yellow-500">★★★★☆ (45 reviews)</span>
              <p className="font-medium flex items-center gap-2">
                <MapPin className="size-4.5" />
                From Nadakkav, Calicut
              </p>
            </div>
            <span className="font-medium text-lg text-teal-600 flex items-center gap-2">
              <CreditCard className="size-5" />
              Starting from ₹1499
            </span>

          </div>
          {/* Image Carousel */}
          <Carousel className="w-full max-w-2xl">
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i} className=" overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1618783129985-dd97dbe4ad99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVjaGFuaWN8ZW58MHwxfDB8fHww" alt={`Service ${i}`} className="w-full h-72 rounded-3xl object-cover" />
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
              Our professional deep cleaning service ensures your home is spotless from top to bottom. Ideal for seasonal cleans or special occasions.
            </p>
          </div>

          {/* Provider Info */}
          <div className="space-y-2">
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

          {/* Service Info / Meta */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Service Info</h2>
            <ul className="text-sm text-muted-foreground list-disc pl-5">
              <li>Duration: 2–3 Hours</li>
              <li>Mode: At Home</li>
              <li>Languages: English, Hindi</li>
              <li>Payment Modes: UPI, Card, Cash</li>
              <li>Cancellation: Free before 24 hrs</li>
            </ul>
          </div>

          {/* Reviews */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <Button variant='outline2' className='border-2'>Add A Review</Button>
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
        <div className="space-y-4 sticky top-8 h-fit bg-teal-50 border rounded-4xl shadow p-5">
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
          </div>

          <Button className="w-full">Book Now</Button>

          <p className="text-xs text-muted-foreground text-center mt-2">
            🔒 Secure payment & free cancellation
          </p>
        </div>
      </section>
      <Footer userRole={"seeker"} />
    </main>
  );
};

export default ServiceDetail;
