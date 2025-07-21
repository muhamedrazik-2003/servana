import React, { useState } from 'react'
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import { MapPin } from 'lucide-react'
import BookingTabs from '../../components/seeker/MyBooking/BookingTabs'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import Footer from '../../components/common/Footer'


function ProviderBookings() {
  const [activeTab, setActiveTab] = useState("ongoing")
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

      <ProviderHeader/>
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
                placeholder="Search Your Bookings..."
                className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text outline-none"
              />
            </div>
            
          </div>
          {/* <div className=' md:max-w-[70%] shadow-sm border  md:rounded-4xl  md:mx-auto  bg-teal-50 dark:bg-teal-950 cursor-pointer p-2'>
              <div className={`relative  text-center flex items-center transition-all duration-300`}>
                <div className={`absolute left-0 rounded-3xl w-[20%] md:w-[20%] h-9 md:h-12 transition-all duration-300 bg-secondary dark:bg-secondary ${getTranslateX(activeTab)}`}></div>
                <h3 onClick={() => setActiveTab("ongoing")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'ongoing' ? "text-background" : 'text-foreground'}`}>Ongoing</h3>
                <h3 onClick={() => setActiveTab("upcoming")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'upcoming' ? "text-background" : 'text-foreground'}`} >Upcoming</h3>
                <h3 onClick={() => setActiveTab("completed")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'completed' ? "text-background" : 'text-foreground'}`} >Completed</h3>
                <h3 onClick={() => setActiveTab("cancelled")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'cancelled' ? "text-background" : 'text-foreground'}`} >Cancelled</h3>
                <h3 onClick={() => setActiveTab("failed")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'failed' ? "text-background" : 'text-foreground'}`} >Failed</h3>
              </div>
            </div> */}
          <BookingTabs userRole={"provider"} />
          
        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default ProviderBookings