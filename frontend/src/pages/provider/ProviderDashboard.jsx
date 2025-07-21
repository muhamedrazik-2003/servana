import React, { useState } from 'react'
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

function ProviderDashboard() {
  const [isAvailableToWork, setIsAvailableToWork] = useState(true)
  return (
    <>
      <ProviderHeader />
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
                <Switch id="toggle-visibility" checked={isAvailableToWork} onCheckedChange={setIsAvailableToWork} />
              </p>
              <Button variant={'outline'} className={'border border-accent'}> <Plus />Add New Service</Button>
            </div>

            <BookingStatusChart />
          </div>

          <div className='border rounded-3xl p-4'>
            <h4 className='px-2 mb-2 text-accent'>Recent Bookings</h4>
            <BookingTable />
          </div>

          <div>
            <div>
              <h4 className='px-2 mb-2 text-accent'>My services</h4>
              <div className='overflow-x-auto flex gap-2 scrollbar-none'>
                <MiniServiceCard />
                <MiniServiceCard />
                <MiniServiceCard />
                <MiniServiceCard />
              </div>
            </div>
            <div className='h-30'>
              <h4 className='px-2 my-2 text-accent'>Most Recent Review</h4>

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