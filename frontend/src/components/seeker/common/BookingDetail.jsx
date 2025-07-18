import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { CalendarIcon, Mail, MapPin, PhoneCall, Star, Timer } from "lucide-react";
import Footer from "../../common/Footer";
import SeekerHeader from "./SeekerHeader";

const BookingDetail = () => {
  return (
    <main>
      <SeekerHeader />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-col-1 lg:grid-cols-[1fr_auto] gap-6">
          {/* service section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Service Info</h3>
              <div className="space-y-2">
                <h1 className="text-4xl text-start">Deep Home Clean</h1>
                <p className="flex gap-2 items-center" ><MapPin className="size-5" /> 21st Cross Rd, Calicut</p>
                <div className="flex gap-4">
                  <p className="flex gap-2 items-center"><CalendarIcon className="size-5" /> Jul 19</p>
                  <p className="flex gap-2 items-center"> <Timer className="size-5" /> 9:00 AM - 11:00 AM</p>
                </div>
              </div>
            </div>
            {/* provider info */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Provider Info</h3>
              <div className="space-y-2">
                <h1 className="text-3xl text-start">Karunakan K P</h1>
                <p className="flex gap-2 items-center" ><MapPin className="size-5" /> Nadakkav, Calicut</p>
                <p className="flex gap-2 items-center" >
                  <Star className="size-5" />
                  <Star className="size-5" />
                  <Star className="size-5" />
                  <Star className="size-5" />
                  <span className="text-teal-500">(20 reviews)</span>
                </p>
                <div className="flex gap-4 mt-5">
                  <Button size='sm'><PhoneCall />Contact Provider</Button>
                  <Button size='sm'><Mail /> Message Provider</Button>
                </div>
              </div>
            </div>
            {/* notes card */}
            <Card className="rounded-3xl py-4 gap-0 mt-6">
              <CardHeader>
                <h3 className="text-lg text-primary mb-1">Provided Instructions</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Please bring eco-friendly cleaning supplies.</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            {/* Image Carousel */}
            <div>
              <h3 className="text-lg text-primary mb-2">Service Images</h3>
              <Carousel className="w-full max-w-2xl">
                <CarouselContent>
                  {[1, 2, 3].map((i) => (
                    <CarouselItem key={i} className=" overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1618783129985-dd97dbe4ad99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVjaGFuaWN8ZW58MHwxfDB8fHww" alt={`Service ${i}`} className="w-full aspect-5/3 rounded-3xl object-cover" />
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
            <Progress value={66} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="text-teal-500 font-medium">Requested</span>
              <span className="text-teal-500 font-medium">Confirmed</span>
              <span className="text-teal-500">In Progress</span>
              <span>Completed</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-primary mb-2">Actions</h3>
          <div className=" space-x-3">
            <Button variant="destructive" className="w-45">Cancel Booking</Button>
            <Button variant="outline2" className="w-45">Reschedule</Button>
            <Button className="w-45" disabled>Mark as Completed</Button>
          </div>
        </div>
        <div className="py-3 mb-10 space-y-5">
          <h3 className="text-lg font-semibold text-primary mb-1">Service Reivews</h3>
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