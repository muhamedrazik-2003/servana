import React from 'react'
import SeekerHeader from '../../components/seeker/SeekerHeader'
import { MapPin } from 'lucide-react'
import BookingSlidingTab from './BookingSlidingTab'

function MyBookings() {
  return (
    <main>
      <SeekerHeader />
      <section className='mt-12 pb-5 md:pb-10'>
        <h1 className='text-[clamp(2.5rem,8vw,48px)] leading-11  md:leading-18 z-0 mb-[1rem]'>My Bookings</h1>
        <p className='max-w-[600px] text-sm mx-auto font-semibold text-center mb-6 md:mb-10'>View your upcoming, ongoing, and past service bookings with real-time updates..</p>
        <div className="relative w-[340px] md:w-[650px] mx-auto">
          <MapPin className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
          <input
            type="text"
            placeholder="Search Your Bookings..."
            className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text-lg outline-none"
          />
        </div>
      </section>
      <BookingSlidingTab />
    </main>
  )
}

export default MyBookings