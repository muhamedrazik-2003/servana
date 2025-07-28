import React from 'react'
import BookingCard from '../common/BookingCard'

function OngoingTab({ data, userRole }) {
  const ongoingBookings = data.find(booking => booking.bookingStatus === "ongoing") || [];
  console.log(ongoingBookings)
  return (
    <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
      <h2 className='text-base text-center mb-0 font-semibold'>{userRole === "provider" ? "Service Bookings That Are Currently In Progress" : "Bookings That Are Currently Underway"}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
        {ongoingBookings?.length > 0
          ? ongoingBookings.map(booking => (
            <BookingCard BookingCardData={booking} />
          ))
          : <h2 className='md:col-span-2 lg:col-span-3 text-center mt-15 text-2xl'>Currently no Ongoing Bookings Available</h2>
        }
      </div>
    </section>
  )
}

export default OngoingTab