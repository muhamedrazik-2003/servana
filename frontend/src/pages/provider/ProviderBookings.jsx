import React, { useState } from 'react'
import ProviderHeader from '../../components/common/Provider&AdminHeader'
import { MapPin } from 'lucide-react'
import BookingTabs from '../../components/seeker/MyBooking/BookingTabs'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import Footer from '../../components/common/Footer'
import { useDispatch } from 'react-redux'
import { handleBookingSearch } from '../../redux/slices/bookingSlice'


function ProviderBookings() {
  const [activeTab, setActiveTab] = useState("ongoing")
  const dispatch = useDispatch();
  const getTranslateX = (activeTab) => {
    switch (activeTab) {
      case 'ongoing':
        return 'translate-x-0';
      case 'upcoming':
        return 'translate-x-[100%] ';
      case 'completed':
        return 'translate-x-[200%]';
      case 'cancelled':
        return 'translate-x-[300%]';
      case 'failed':
        return 'translate-x-[400%]';
      default:
        return 'md:translate-x-0';
    }
  };
  return (
    <>

      <ProviderHeader />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <ProviderSidebar />
        </div>

        {/* Main Content */}
        <section className="min-h-[calc(100vh-82px)]  w-full p-0 m-0">
          <div className='flex items-end mb-6'>
            <div>
              <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>Bookings</h1>
              <p className='max-w-[400px] text-sm font-semibold p-0'>Monitor your ongoing, completed, and cancelled bookings</p>
            </div>
            <div className="relative w-[340px] md:w-[560px] mx-auto">
              <MapPin className="absolute left-3 top-3 size-5 text-primary" />
              <input
                type="text"
                onChange={(e) => dispatch(handleBookingSearch(e.target.value))}
                placeholder="Search Your Bookings by ID, service details, Provider name, date, time and more"
                className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-orange-50 dark:bg-orange-950 md:text outline-none"
              />
            </div>

          </div>
          <BookingTabs userRole={"provider"} />

        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default ProviderBookings