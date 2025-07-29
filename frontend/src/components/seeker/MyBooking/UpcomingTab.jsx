import React from 'react'
import BookingCard from '../common/BookingCard'
import { useSelector } from 'react-redux';

function UpcomingTab({ data, userRole }) {
  console.log(data)
  const upcomingBookings = data.filter(booking => booking.bookingStatus === "pending") || [];
  console.log(upcomingBookings)
  return (
    <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
      <h2 className='text-base text-center mb-0 font-semibold'>Scheduled services that are yet to begin.</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
        {upcomingBookings.length > 0
          ? upcomingBookings.map((booking, index) => (
            <BookingCard key={index} bookingCardData={booking} />
          ))
          : <h2 className='md:col-span-2 lg:col-span-3 text-center py-8 text-5xl text-secondary'>You don’t have <br />any <span className='text-primary'>upcoming</span> bookings<br /> at the moment.</h2>
        }

      </div>
    </section>
  )
}

export default UpcomingTab