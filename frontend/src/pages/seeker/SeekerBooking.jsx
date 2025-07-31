import React from 'react'
import SeekerHeader from '../../components/seeker/common/SeekerHeader'
import { MapPin, Search } from 'lucide-react'
import BookingTabs from '../../components/seeker/MyBooking/BookingTabs'
import Footer from '../../components/common/Footer'
import { useDispatch } from 'react-redux'
import { handleBookingSearch } from '../../redux/slices/bookingSlice'

function MyBookings() {
  const dispatch = useDispatch();
  return (
    <main>
      <SeekerHeader scrollValue={210} />
      <section className='mt-8 pb-5 md:pb-8'>
        <h1 className='text-[clamp(2.5rem,8vw,48px)] leading-11  md:leading-18 z-0 mb-2'>My Bookings</h1>
        <p className='max-w-[600px] text-sm mx-auto font-semibold text-center mb-6 p-0'>View your upcoming, ongoing, and past service bookings with real-time updates..</p>
        <div className="relative w-[340px] md:w-[560px] mx-auto">
          <Search className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
          <input
            type="text"
            onChange={(e) => dispatch(handleBookingSearch(e.target.value))}
            placeholder="Search Your Bookings by ID, service details, Provider name, date, time and more"
            className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 outline-none"
          />
        </div>
      </section>
      <BookingTabs />
      <Footer userRole={"seeker"} />
    </main>
  )
}

export default MyBookings