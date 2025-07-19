import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SeekerHeader from "../../components/seeker/common/SeekerHeader";
import Footer from "../../components/common/Footer";
import { Badge } from "../../components/ui/badge"
import { ImagePlus, Pen, PenOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const bookingStats = [
  { label: "Total Bookings", value: 12 },
  { label: "Ongoing", value: 3 },
  { label: "Completed", value: 8 },
  { label: "Cancelled", value: 1 },
];

export default function SeekerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <main>
      <SeekerHeader />
      <div className="max-w-5xl mx-auto px-4 py-12 mt-6 space-y-10">
        <h1 className='text-[clamp(2.5rem,8vw,44px)] leading-11  md:leading-18 z-0 mb-2'>My Profile </h1>
        <Card className="relative flex flex-col items-center gap-6 p-3 bg-white  shadow-none border-0">
          {isEditing
            ? <>
              <PenOff onClick={() => setIsEditing(false)} className="absolute top-2 right-[40%] size-5 text-primary" />
              <label htmlFor="profile" className="cursor-pointer">
                <input type="file" name="profile" id="profile" className="hidden" />
                <Avatar className='size-30 relative'>
                  <ImagePlus className="absolute top-[50%] left-[50%] -translate-[50%] size-30 text-violet-300 rounded-full border-violet-400 bg-gray-600 border-2 p-10" />
                  <AvatarImage src="https://github.com/shadcn.png" className='opacity-30' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

            </>

            : <>
              <ImagePlus onClick={() => setIsEditing(true)} className="absolute top-2 right-[40%] size-5 text-primary" />

              <Avatar className='size-30'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          }


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
        <Separator className='my-16' />
        <div className="grid grid-col-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary">Profile Details</h3>
              {isEditing ? (
                <PenOff onClick={() => setIsEditing(false)} className="size-5 text-primary cursor-pointer" />
              ) : (
                <Pen onClick={() => setIsEditing(true)} className="size-5 text-primary cursor-pointer" />
              )}
            </div>

            {/* Full Name */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[200px]">Full name</p>
              {isEditing ? (
                <Input name="fullName" placeholder="Full name" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">Muhamed Razik</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Date of Birth */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[200px]">Date of Birth</p>
              {isEditing ? (
                <Input name="dob" placeholder="Date of Birth" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">Not Provided</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Gender */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[200px]">Gender</p>
              {isEditing ? (
                <Select>
                  <SelectTrigger className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-semibold text-start">Not Set</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Nationality */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[200px]">Nationality</p>
              <p className="font-semibold text-start">Indian</p>
            </div>
            <Separator className="my-3" />

            {/* Address */}
            <div className="flex items-start gap-3">
              <p className="text-teal-500 w-[200px] mt-2">Address</p>
              {isEditing ? (
                <div className="flex flex-col gap-2 w-full max-w-2xl">
                  <Input placeholder="City" className="rounded-3xl bg-teal-50 px-3 py-1" />
                  <Input placeholder="State" className="rounded-3xl bg-teal-50 px-3 py-1" />
                  <Input placeholder="PIN Code" className="rounded-3xl bg-teal-50 px-3 py-1" />
                </div>
              ) : (
                <p className="font-semibold text-start">Nadakkav, Calicut</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Phone Number */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[200px]">Phone Number</p>
              {isEditing ? (
                <Input placeholder="Phone Number" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">938567478</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Email Address */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[200px]">Email Address</p>
              {isEditing ? (
                <Input placeholder="Email Address" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">muhemed@gmail.com</p>
              )}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary mb-6">Account Details</h3>
              <div className="flex items-center">
                <p className="text-teal-500 w-[200px]">Display Name</p>
                <p className="font-semibold text-start">Muhamed Razik</p>
              </div>
              <Separator className='my-3' />
              <div className="flex items-center">
                <p className="text-teal-500 w-[200px]">Account Type</p>
                <Badge className={'bg-secondary text-foreground font-semibold'}>Seeker</Badge>
              </div>
              <Separator className='my-3' />

              <div className="flex items-center">
                <p className="text-teal-500 w-[200px]">Account Created At</p>
                <p className="font-semibold text-start">12 june 2025</p>
              </div>
              <Separator className='my-3' />

              <div className="flex items-center">
                <p className="text-teal-500 w-[200px]">Account Verfication</p>
                <Badge className={'bg-green-200 text-foreground font-semibold'}>Verifired</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-primary">Security Settings</h3>
                {isEditing ? (
                  <PenOff onClick={() => setIsEditing(false)} className="size-5 text-primary cursor-pointer" />
                ) : (
                  <Pen onClick={() => setIsEditing(true)} className="size-5 text-primary cursor-pointer" />
                )}
              </div>
              <div className="flex items-center">
                <p className="text-teal-500 w-[200px]">Password</p>
                {isEditing ? (
                  <Input
                    type="password"
                    placeholder="New Password"
                    className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm"
                  />
                ) : (
                  <p className="font-semibold text-start">*******</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer userRole={'seeker'} />
    </main>
  );
}
