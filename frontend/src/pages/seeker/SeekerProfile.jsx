import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SeekerHeader from "../../components/seeker/common/SeekerHeader";
import Footer from "../../components/common/Footer";

const bookingStats = [
  { label: "Total Bookings", value: 12 },
  { label: "Ongoing", value: 3 },
  { label: "Completed", value: 8 },
  { label: "Cancelled", value: 1 },
];

export default function SeekerProfilePage() {
  return (
    <main>
      <SeekerHeader />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <h1 className='text-[clamp(2.5rem,8vw,44px)] leading-11  md:leading-18 z-0 mb-2'>My Profile</h1>
        {/* <p className='max-w-[600px] text-sm mx-auto font-semibold text-center mb-6 p-0'>Manage your Your Personal Details and Account.</p> */}
        {/* Highlight Panel */}
        <Card className="flex flex-col items-center gap-6 p-3 bg-white  shadow-none border-0">
          <Avatar className='size-30'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h4 className="text-2xl font-semibold text-gray-800">Muhamed Razik</h4>
            <p className="text-gray-500 text-sm">muhamedrazik@email.com</p>
            <p className="text-gray-500 text-sm">+91 98765 43210</p>
          </div>

        </Card>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {bookingStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 place-content-center text-center border rounded-full py-3">
              <p className="text-xl font-bold text-violet-600 inline-block">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <Footer userRole={'seeker'} />
    </main>
  );
}
