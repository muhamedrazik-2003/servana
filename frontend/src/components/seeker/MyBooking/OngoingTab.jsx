import React from 'react'
import BookingCard from '../common/BookingCard'

function OngoingTab({ data, userRole }) {
  const ongoingBookings = data.filter(booking => booking.bookingStatus === "ongoing") || [];
  console.log(ongoingBookings)
  return (
    <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
      <h2 className='text-base text-center mb-0 font-semibold'>{userRole === "provider" ? "Service Bookings That Are Currently In Progress" : "Bookings That Are Currently Underway"}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
        {ongoingBookings?.length > 0
          ? ongoingBookings.map((booking, index) => (
            <BookingCard key={index} userRole={userRole} bookingCardData={booking} />
          ))
          : userRole === "provider"
            ? <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>You don’t have any <span className='text-primary'>ongoing</span> bookings<br /> at the moment.</h2>
            : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>You don’t have any <span className='text-primary'>ongoing</span> bookings<br /> at the moment.</h2>

        }
      </div>
    </section>
  )
}

export default OngoingTab