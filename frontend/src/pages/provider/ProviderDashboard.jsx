import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/provider/common/ProviderSidebar"
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import SummarySection from '../../components/provider/Dashboard/SummarySection';
import { Button } from "../../components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Loader, Loader2, Plus } from 'lucide-react';
import BookingStatusChart from '../../components/provider/Dashboard/BookingStatusChart';
import { BookingTable } from '../../components/provider/common/BookingTable';
import MiniServiceCard from '../../components/provider/common/miniServiceCard';
import MiniReviewCard from '../../components/provider/common/miniReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProviderBookings } from '../../redux/slices/bookingSlice';
import { getUserServices } from '../../redux/slices/serviceSlice';
import { getAllProviderReviews } from '../../redux/slices/reviewSlice';

function ProviderDashboard() {
  const [isAvailableToWork, setIsAvailableToWork] = useState(true)
  const { services, isLoading } = useSelector(state => state.serviceSlice);
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
        <section className="h-[calc(100vh-82px)]  grid grid-cols-2 grid-rows-[auto_1fr] w-full m-0 gap-4 p-0 overflow-hidden">
          <SummarySection />

          <div className='grid grid-rows-[auto_1fr]'>
            <div className='flex items-center justify-end gap-3 pb-4 px-4'>
              <p className={`flex items-center gap-3 justify-end border p-1.5 px-4 rounded-3xl ${isAvailableToWork ? "text-green-500 bg-gray-50" : " text-slate-700"}`}>
                {isAvailableToWork ? "Open to Work" : "Not Open to Work"}
                <Switch disabled={true} id="toggle-visibility" checked={isAvailableToWork} onCheckedChange={setIsAvailableToWork} />
              </p>
              <Link to={'/provider/services/new'}>
                <Button variant={'outline'} className={'border border-accent'}> <Plus />Add New Service</Button>
              </Link>
            </div>

            <BookingStatusChart />
          </div>

          <div className='border rounded-3xl p-4'>
            <div className='flex justify-between items-center mb-3'>
              <h4 className='px-2  text-accent'>Recent Bookings</h4>
              <Link to={'/provider/bookings'}>
                <Button variant={'outline'} size={'sm'} className={'h-8'}> View All Bookings</Button>
              </Link>
            </div>
            <BookingTable />
          </div>

          <div>
            <div>
              <div className='flex items-center justify-between'>
                <h4 className='px-2 mb-2 text-accent'>My services</h4>
                <Link to={'/provider/services'}>
                  <Button variant={'outline'} size={'sm'} className={'h-6'}> View Services</Button>
                </Link>
              </div>
              <div className='overflow-x-auto flex gap-2 scrollbar-none'>
                {isLoading
                  ? <h4 className='my-4 mb-10 flex items-center gap-2'>Services Loading <Loader2 className='size-5' /></h4>

                  : services.length > 0
                    ? services.map(serivce => (
                      <MiniServiceCard data={serivce} />

                    ))

                    : <h4 className='my-4 mb-10'>No Services Available Currently</h4>
                }
              </div>
            </div>
            <div className=''>
              <div className='flex items-center justify-between'>
                <h4 className='px-2 mb-2 text-accent'>Most recent Reviews</h4>
                <Link to={'/provider/reviews'}>
                  <Button variant={'outline'} size={'sm'} className={'h-6'}> View Reviews</Button>
                </Link>
              </div>
              <div className='flex flex-col gap-2 overflow-y-auto scrollbar-none max-h-40 px-2'>
                {isReviewLoading
                  ? <h4 className='my-4 mb-10 flex items-center gap-2'>Reviews Loading <Loader2 className='size-5' /></h4>

                  : reviews.length > 0
                    ? reviews.map((review) => (
                      <MiniReviewCard reviewData={review} />
                    ))
                    : <h4 className='my-4 mb-10'>No Reviews Available Currently</h4>
                }
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
}


export default ProviderDashboard