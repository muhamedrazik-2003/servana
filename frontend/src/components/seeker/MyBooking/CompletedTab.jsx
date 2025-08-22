import React from 'react'
import BookingCard from '../common/BookingCard'

function CompletedTab({ data, userRole }) {
  const completedBookings = data.filter(booking => booking.bookingStatus === "completed") || [];
  // console.log(completedBookings)
  return (
    <section className={`${userRole === "provider" ? "mx-4 lg:mr-14" : ""}`}>
      <h2 className='text-sm lg:text-base text-center mb-0 font-semibold'>Your past completed services appear here for reference..</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
        {completedBookings?.length > 0
          ? completedBookings.map((booking, index) => (
            <BookingCard key={index} userRole={userRole} bookingCardData={booking} />
          ))
          : userRole === "provider"
            ? <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-xl lg:text-3xl leading-7 lg:leading-10'>You don’t have any <span className='text-green-500'>completed</span> bookings<br /> at the moment.</h2>
          : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-xl lg:text-3xl leading-7 lg:leading-10'>You don’t have any <span className='text-green-500'>completed</span> bookings<br /> at the moment.</h2>
        }
      </div>
    </section>
  )
}

export default CompletedTab