import React, { useState } from 'react'
import Sidebar from "../../components/provider/common/ProviderSidebar"
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import SummarySection from '../../components/provider/Dashboard/SummarySection';
import { Button } from "../../components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plus } from 'lucide-react';
import BookingStatusChart from '../../components/provider/Dashboard/BookingStatusChart';

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
        <section className="h-[calc(100vh-82px)]  grid grid-cols-2 grid-rows-[auto_1fr] w-full m-0 gap-4 p-0">
          <SummarySection />
          <div className='grid grid-rows-[auto_1fr]'>
            <div className='flex items-center justify-end gap-3 pb-4 px-4'>
              <p className={`flex items-center gap-3 justify-end border p-1.5 px-4 rounded-3xl ${isAvailableToWork ? "text-green-500 bg-gray-50" : " text-slate-700"}`}>
                {isAvailableToWork ?"Open to Work" : "Not Open to Work"}
                <Switch id="toggle-visibility" checked={isAvailableToWork} onCheckedChange={setIsAvailableToWork} />
              </p>
              <Button variant={'outline'} className={'border border-accent'}> <Plus/>Add New Service</Button>
            </div>
            <BookingStatusChart/>

          </div>
          <div className='border rounded-3xl'>recent booking section</div>
          <div className='border rounded-3xl'></div>
        </section>
      </main>
    </>
  );
}


export default ProviderDashboard