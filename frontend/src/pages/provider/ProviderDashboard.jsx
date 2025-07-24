import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/provider/common/ProviderSidebar"
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import SummarySection from '../../components/provider/Dashboard/SummarySection';
import { Button } from "../../components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plus } from 'lucide-react';
import BookingStatusChart from '../../components/provider/Dashboard/BookingStatusChart';
import { BookingTable } from '../../components/provider/common/BookingTable';
import MiniServiceCard from '../../components/provider/common/miniServiceCard';
import MiniReviewCard from '../../components/provider/common/miniReviewCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProviderDashboard() {
  const [isAvailableToWork, setIsAvailableToWork] = useState(true)
  const { services, isLoading, } = useSelector(state => state.serviceSlice);

  useEffect(() => {

  })
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
                {
                  services.map(serivce => (
                    <MiniServiceCard data={serivce} />

                  ))
                }
              </div>
            </div>
            <div className='h-30'>
              <div className='flex items-center justify-between'>
                <h4 className='px-2 mb-2 text-accent'>Most recent Reviews</h4>
                <Link to={'/provider/reviews'}>
                  <Button variant={'outline'} size={'sm'} className={'h-6'}> View Reviews</Button>
                </Link>
              </div>
              <div className='flex flex-col gap-2 overflow-y-auto scrollbar-none h-full px-2'>
                <MiniReviewCard
                  name="Arjun S."
                  rating={4}
                  review="Great experience! The service provider was on time and did an excellent job."
                />
                <MiniReviewCard
                  name="Arjun S."
                  rating={4}
                  review="Great experience! The service provider was on time and did an excellent job."
                />
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
}


export default ProviderDashboard