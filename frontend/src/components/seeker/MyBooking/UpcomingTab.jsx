import React from 'react'
import BookingCard from '../common/BookingCard'
import { useSelector } from 'react-redux';

function UpcomingTab({ data, userRole }) {
  console.log(data)
  const upcomingBookings = data.filter(booking => booking.bookingStatus === "pending") || [];
  // console.log(upcomingBookings)
  return (
    <section className={`${userRole === "provider" ? "mx-4 lg:mr-14" : ""}`}>
      <h2 className='text-sm lg:text-base text-center mb-0 font-semibold'>Scheduled services that are yet to begin.</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mx-100px gap-5'>
        {upcomingBookings.length > 0
          ? upcomingBookings.map((booking, index) => (
            <BookingCard key={index} userRole={userRole} bookingCardData={booking} />
          ))
          : userRole === "provider"
            ? <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>You don’t have any <span className='text-primary'>new</span> booking Requests<br /> at the moment.</h2>
          : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>You don’t have any <span className='text-primary'>pending</span> bookings<br /> at the moment.</h2>
        }

      </div>
    </section>
  )
}

export default UpcomingTab