import React from 'react'
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import Footer from '../../components/common/Footer'
import { MapPin } from 'lucide-react'
import SummarySection from '../../components/provider/Dashboard/SummarySection'

function MyServices() {
  return (
       <>

      <ProviderHeader/>
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <ProviderSidebar />
        </div>

        {/* Main Content */}
        <section className="min-h-[calc(100vh-82px)]  w-full p-0 m-0 mr-[80px]">
          <div className='flex items-end justify-between mb-6'>
            <div>
              <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>Your Services</h1>
              <p className='max-w-[400px] text-sm font-semibold p-0'>Monitor your active and inactive services listed by you</p>
            </div>
            <div className="relative w-[340px] md:w-[590px] ml-auto">
              <MapPin className="absolute left-3 top-3 size-5 text-primary" />
              <input
                type="text"
                placeholder="Search Your Bookings..."
                className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-orange-50 dark:bg-orange-950 md:text outline-none"
              />
            </div>
            
          </div>
          <SummarySection page={'services'}/>
          
        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default MyServices