import React from 'react'
import BookingCard from '../common/BookingCard'

function FailedTab({ data, userRole }) {
    const failedBookings = data.filter(booking => booking.bookingStatus === "failed") || [];
    console.log(failedBookings)
    return (
        <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
            <h2 className='text-base text-center mb-0 font-semibold'>Failed bookings due to payment or system issues.</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
                {failedBookings?.length > 0
                    ? failedBookings.map((booking, index) => (
                        <BookingCard key={index} userRole={userRole} bookingCardData={booking} />
                    ))
                    : userRole === "provider"
            ? <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>You don’t have any <span className='text-red-500'>failed</span> bookings<br /> at the moment.</h2>
          : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>You don’t have any <span className='text-red-500'>failed</span> bookings<br /> at the moment.</h2>
                }
            </div>
        </section>
    )
}

export default FailedTab