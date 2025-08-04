import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/provider/common/ProviderSidebar"
import ProviderHeader from '../../components/common/Provider&AdminHeader'
import SummarySection from '../../components/provider/Dashboard/SummarySection';
import { Button } from "../../components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Loader, Loader2, Plus } from 'lucide-react';
import BookingStatusChart from '../../components/provider/Dashboard/BookingStatusChart';
// import MiniServiceCard from '../../components/provider/common/miniServiceCard';
import MiniReviewCard from '../../components/provider/common/miniReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProviderBookings } from '../../redux/slices/bookingSlice';
import { getUserServices } from '../../redux/slices/serviceSlice';
import { getAllProviderReviews } from '../../redux/slices/reviewSlice';
import RecentBooking from '../../components/common/RecentBooking';
import RecentServices from '../../components/common/RecentServices';

function ProviderDashboard() {
  const [isAvailableToWork, setIsAvailableToWork] = useState(true)
  const { reviews, isReviewLoading } = useSelector(state => state.reviewSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProviderBookings());
    dispatch(getUserServices());
    dispatch(getAllProviderReviews());
  }, [])


  return (
    <>
      <ProviderHeader page={'dashboard'} />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <Sidebar />
        </div>

        {/* Main Content */}
        <section className="h-[calc(100vh-82px)]  grid grid-cols-2  w-full m-0 gap-4 p-0 overflow-hidden">
          <div className='space-y-4'>
            <div className='flex items-center justify-end gap-3 px-4'>
              <p className={`flex items-center gap-3 justify-end border p-1.5 px-4 rounded-3xl ${isAvailableToWork ? "text-green-500 bg-gray-50" : " text-slate-700"}`}>
                {isAvailableToWork ? "Open to Work" : "Not Open to Work"}
                <Switch disabled={true} id="toggle-visibility" checked={isAvailableToWork} onCheckedChange={setIsAvailableToWork} />
              </p>
              <Link to={'/provider/services/new'}>
                <Button variant={'outline'} className={'border border-accent'}> <Plus />Add New Service</Button>
              </Link>
            </div>
            <SummarySection />
            <RecentBooking/>
          </div>
          <div className='space-y-2'>
            <BookingStatusChart />
            <RecentServices/>

            <div className=''>
              <div className='flex items-center justify-between'>
                <h4 className='px-2 mb-2 text-accent'>Most recent Reviews</h4>
                <Link to={'/provider/reviews'}>
                  <Button variant={'outline'} size={'sm'} className={'h-6'}> View Reviews</Button>
                </Link>
              </div>
              <div className='flex flex-col gap-2 overflow-y-auto scrollbar-none max-h-43 px-2'>
                {isReviewLoading
                  ? <h4 className='my-4 mb-10 flex items-center gap-2'>Reviews Loading <Loader2 className='size-5 animate-spin' /></h4>

                  : reviews.length > 0
                    ? reviews.map((review) => (
                      <MiniReviewCard reviewData={review} />
                    ))
                    : <h4 className='my-4 mb-10'>No Reviews Available Currently</h4>
                }
              </div>
            </div>
          </div>
          <div>

          </div>

        </section>
      </main >
    </>
  );
}


export default ProviderDashboard