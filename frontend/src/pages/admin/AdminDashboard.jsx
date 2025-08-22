import React, { useEffect } from 'react'
import { Separator } from "../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import { useDispatch } from 'react-redux';
import { getAllBookings } from '../../redux/slices/bookingSlice';
import AdminSummaryCard from '../../components/admin/dashboard/AdminSummaryCard';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import SampleTable from '../../components/provider/common/SampleTable';
import RecentBooking from '../../components/common/RecentBooking';
import { getAllServices } from '../../redux/slices/serviceSlice';
import RecentServices from '../../components/common/RecentServices';
import BookingServicesReviewsChart from '../../components/BookingServicesReviewsChart';
import { getAllReviews } from '../../redux/slices/reviewSlice';
import { getAllProviders, getAllSeekers } from '../../redux/slices/userSlice';
import { getCategories } from '../../redux/slices/categorySlice';
import CustomerProviderChart from '../../components/CustomerProviderChart';

function AdminDashboard() {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const DateToday = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllServices());
    dispatch(getAllReviews());
    dispatch(getAllProviders());
    dispatch(getAllSeekers());
    dispatch(getCategories())
    // dispatch(getAllProviderReviews());
  }, [])


  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 lg:gap-4">
        {/* Sidebar */}
        <div className="">
          <AdminSidebar />
        </div>
        {/* Main Content */}
        <section className=" lg:h-[calc(100vh-82px)]  grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto_1fr_1.3fr] g  w-full m-0 gap-4 p-0 lg:overflow-hidden mb-18 lg:mb-0">
          <div className='h-auto'>
            <h1 className="m-0 text-xl lg:text-3xl text-start">Welcome <span className="text-primary">{user?.fullName}</span></h1>
            <p>Today is <span className='italic font-semibold'>{DateToday}</span></p>
          </div>
          <AdminSummaryCard />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <BookingServicesReviewsChart/>
            <CustomerProviderChart/>
          </div>
          <div className='space-y-2 lg:col-span-2'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-61'>
              <RecentBooking  userRole={"admin"}/>
              <RecentServices userRole={"admin"}/>
            </div>
          </div>

        </section>
      </main >
    </>
  );
}

export default AdminDashboard