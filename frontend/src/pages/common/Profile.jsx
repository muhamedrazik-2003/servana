import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SeekerHeader from "../../components/seeker/common/SeekerHeader";
import Footer from "../../components/common/Footer";
import { Badge } from "../../components/ui/badge"
import { ImagePlus, LoaderCircle, Pen, PenOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocation } from "react-router-dom";
import ProviderHeader from "../../components/provider/common/ProviderHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { toast } from "sonner";

const bookingStats = [
  { label: "Total Bookings", value: 12 },
  { label: "Ongoing", value: 3 },
  { label: "Completed", value: 8 },
  { label: "Cancelled", value: 1 },
];
function ProfilePage() {
  const { pathname } = useLocation();
  const { user, isUpdating } = useSelector(state => state.userSlice);
  const userDataFallback = JSON.parse(sessionStorage.getItem('user'));
  const [userData, setUserData] = useState(user?.length > 0 ? user : userDataFallback);
  const dispatch = useDispatch();
  let role = ""

  if (pathname.includes('/provider')) {
    role = "provider"
  } else if (pathname.includes('/admin')) {
    role = "admin"
  } else {
    role = "seeker"
  }
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState()

  const userSplited = user?.fullName?.trim().split(" ") || [];
  const firstInitial = userSplited[0]?.[0] || "";
  const secondInitial = userSplited[1]?.[0] || "";

  const userFallback = (firstInitial + secondInitial).toUpperCase();

  const handleImageChange = (imageFile) => {
    setUserData({ ...userData, profilePicture: imageFile });
    const previewURL = URL.createObjectURL(imageFile);
    setPreview(previewURL);
  }

  const handleUpdate = async () => {
    try {
      console.log(userData)
      const allowedTypes = [
        "image/jpeg", // .jpg, .jpeg
        "image/png",  // .png
        "image/webp", // .webp
        "image/avif"  // .avif
      ];
      let imageNotAllowed = false

      if (typeof userData.profilePicture !== "string" && !allowedTypes.includes(userData.profilePicture?.type)) {
        imageNotAllowed = true;
      }
      if (imageNotAllowed) {
        return toast.error("only .jpg, jpeg, png, webp and  avif type images are accepted");
      }

      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("phone", userData.phone);
      formData.append("dateOfBirth", userData.dateOfBirth);
      formData.append("gender", userData.gender);
      formData.append("city", userData.location.city);
      formData.append("state", userData.location.state);
      formData.append("pincode", userData.location.pincode);
      formData.append("profilePicture", userData.profilePicture);

      const userId = userData._id;
      const response = await dispatch(updateUser({ userId, formData }))

      // console formData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      if (updateUser.fulfilled.match(response)) {
        toast.success("User Profile Updated successfully!")
        sessionStorage.setItem("user", JSON.stringify(userData))
        setIsEditing(false)
        return;
      } else if (updateUser.rejected.match(response)) {
        return toast.error(response.payload?.message || "Something went wrong while updating User Profile");
      }

    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    }
  }
  return (
    <main>
      {role === "provider"
        ? <ProviderHeader page={"profile"}/>
        : <SeekerHeader />
      }

      <div className="relative max-w-5xl mx-auto px-4 py-12 mt-6 space-y-10">
        <h1 className='text-[clamp(2.5rem,8vw,44px)] leading-11  md:leading-18 z-0 mb-2'>My Profile </h1>
        <Card className="relative flex flex-col items-center gap-6 p-3 bg-white  shadow-none border-0">
          {isEditing
            ? <>
              <PenOff onClick={() => setIsEditing(false)} className="absolute top-2 right-[30%] lg:right-[40%] size-5 text-primary" />
              <label htmlFor="profile" className="cursor-pointer">
                <input onChange={(e) => handleImageChange(e.target.files[0])} type="file" name="profile" id="profile" className="hidden" />
                <Avatar className='size-30 relative'>
                  <ImagePlus className="absolute top-[50%] left-[50%] -translate-[50%] size-30 text-violet-100 rounded-full border-violet-400 bg-gray-600 border-2 p-10" />
                  <AvatarImage src={`${preview ? preview : userData?.profilePicture instanceof File ? URL.createObjectURL(userData.profilePicture) : userData.profilePicture}`} className='opacity-60' />
                  <AvatarFallback>{userFallback}</AvatarFallback>
                </Avatar>
              </label>

            </>

            : <>
              <ImagePlus onClick={() => setIsEditing(true)} className="absolute top-2 right-[30%] lg:right-[40%] size-5 text-primary" />

              <Avatar className='size-30'>
                <AvatarImage src={`${preview || userData.profilePicture}`} />
                <AvatarFallback>{userFallback}</AvatarFallback>
              </Avatar>
            </>
          }


          <div className="text-center">
            <h4 className="text-2xl font-semibold text-gray-800">{userData.fullName}</h4>
            <p className="text-gray-500 text-sm">{userData.email}</p>
            <p className="text-gray-500 text-sm">{userData.phone}</p>
          </div>

        </Card>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {bookingStats?.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 place-content-center text-center border rounded-full py-3">
              <p className="text-xl font-bold text-violet-600 inline-block">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <Separator className='my-16' />
        <div className="grid grid-col-1 md:grid-cols-2 gap-12 mb-20 mx-4 lg:mx-0">
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
              <p className="text-teal-500 w-[180px] lg:w-[200px]">Full name</p>
              {isEditing ? (
                <Input name="fullName" onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} defaultValue={`${userData.fullName}`} placeholder="Full name" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">{userData.fullName}</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Date of Birth */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[180px] lg:w-[200px]">Date of Birth</p>
              {isEditing ? (
                <Input name="dob" onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })} defaultValue={`${userData.dateOfBirth}`} placeholder="Date of Birth" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">{userData.dateOfBirth}</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Gender */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[180px] lg:w-[200px]">Gender</p>
              {isEditing ? (
                <Select onValueChange={(value) => setUserData({ ...userData, gender: value })} defaultValue={`${userData.gender}`}>
                  <SelectTrigger className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-semibold text-start">{userData?.gender}</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Nationality */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[180px] lg:w-[200px]">Nationality</p>
              <p className="font-semibold text-start">Indian</p>
            </div>
            <Separator className="my-3" />

            {/* Address */}
            <div className="flex items-start gap-3">
              <p className="text-teal-500 w-[180px] lg:w-[200px] mt-2">Address</p>
              {isEditing ? (
                <div className="flex flex-col gap-2 w-full max-w-2xl">
                  <Input onChange={(e) => setUserData({ ...userData, location: { ...userData.location, city: e.target.value } })} defaultValue={userData.location.city} placeholder="City" className="rounded-3xl bg-teal-50 px-3 py-1" />
                  <Input onChange={(e) => setUserData({ ...userData, location: { ...userData.location, state: e.target.value } })} defaultValue={userData.location.state} placeholder="State" className="rounded-3xl bg-teal-50 px-3 py-1" />
                  <Input onChange={(e) => setUserData({ ...userData, location: { ...userData.location, pincode: e.target.value } })} defaultValue={userData.location.pincode} placeholder="PIN Code" className="rounded-3xl bg-teal-50 px-3 py-1" />
                </div>
              ) : (
                <p className="font-semibold text-start">{`${userData.location.city}, ${userData.location.state}, ${userData.location.pincode}`}</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Phone Number */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[180px] lg:w-[200px]">Phone Number</p>
              {isEditing ? (
                <Input onChange={(e) => setUserData({ ...userData, phone: e.target.value })} defaultValue={userData.phone} placeholder="Phone Number" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">{userData.phone}</p>
              )}
            </div>
            <Separator className="my-3" />

            {/* Email Address */}
            <div className="flex items-center">
              <p className="text-teal-500 w-[180px] lg:w-[200px]">Email Address</p>
              {isEditing ? (
                <Input onChange={(e) => setUserData({ ...userData, email: e.target.value })} defaultValue={userData.email} placeholder="Email Address" className="rounded-3xl bg-teal-50 px-3 py-1 w-full max-w-sm" />
              ) : (
                <p className="font-semibold text-start">{userData.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary mb-6">Account Details</h3>
              <div className="flex items-center">
                <p className="text-teal-500 w-[180px] lg:w-[200px]">Display Name</p>
                <p className="font-semibold text-start">{userData.fullName}</p>
              </div>
              <Separator className='my-3' />
              <div className="flex items-center">
                <p className="text-teal-500 w-[180px] lg:w-[200px]">Account Type</p>
                <Badge className={`text-foreground font-semibold ${role === "admin" ? "bg-primary text-white" : role === "provider" ? "bg-accent" : "bg-secondary"}`}>{userData.role}</Badge>
              </div>
              <Separator className='my-3' />

              <div className="flex items-center">
                <p className="text-teal-500 w-[180px] lg:w-[200px]">Account Created At</p>
                <p className="font-semibold text-start">{userData.createdAt.slice(0, 10)}</p>
              </div>
              <Separator className='my-3' />
              <div className="flex items-center">
                <p className="text-teal-500 w-[180px] lg:w-[200px]">Account Updated At</p>
                <p className="font-semibold text-start">{userData.updatedAt.slice(0, 10)}</p>
              </div>
              <Separator className='my-3' />

              <div className="flex items-center">
                <p className="text-teal-500 w-[180px] lg:w-[200px]">Account Verfication</p>
                <Badge className={`${userData.isVerified ? "bg-green-200" : "bg-orange-200"} text-foreground font-semibold`}>{userData.isVerified ? "Verified" : "Not Verified"}</Badge>
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
                <p className="text-teal-500 w-[180px] lg:w-[200px]">Password</p>
                {isEditing ? (
                  <Input
                    type="password"
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    defaultValue={userData.password}
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
        {/* editing update floating button */}
        {isEditing
          && <div className="fixed bottom-10 right-14 flex flex-col gap-2">
            <Button onClick={() => setIsEditing(false)} variant='outline2' className='bg-background'>Cancel</Button>
            <Button disabled={isUpdating} onClick={handleUpdate}>
              {isUpdating
                ? <>
                  <LoaderCircle  className="size-6 animate-spin"/> Updating
                </>
                : "Update"}
            </Button>
          </div>
        }
      </div>
      {role === "provider"
        ? <Footer userRole={'provider'} />
        : <Footer userRole={'seeker'} />
      }
    </main>
  );
}
export default ProfilePage;