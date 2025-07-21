import React from 'react'
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import { MapPin } from 'lucide-react'
import BookingTabs from '../../components/seeker/MyBooking/BookingTabs'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import Footer from '../../components/common/Footer'

function ProviderBookings() {
  return (
    <>

      <ProviderHeader />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <ProviderSidebar />
        </div>

        {/* Main Content */}
        <section className="h-[calc(100vh-82px)]  w-full p-0 overflow-hidden m-0">
          <div className='flex items-end mb-6'>
            <div>
              <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>Bookings</h1>
              <p className='max-w-[400px] text-sm font-semibold p-0'>Monitor your ongoing, completed, and cancelled bookings</p>
            </div>
            <div className="relative w-[340px] md:w-[560px] mx-auto">
              <MapPin className="absolute left-3 top-3 size-5 text-primary" />
              <input
                type="text"
                placeholder="Search Your Bookings..."
                className="pl-9 md:pl-11 pr-4 py-2 md:py-2 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text outline-none"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default ProviderBookings