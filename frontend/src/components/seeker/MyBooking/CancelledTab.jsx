import React from 'react'
import BookingCard from '../common/BookingCard'

function CancelledTab({ data, userRole }) {
    const cancelledBookings = data.filter(booking => booking.bookingStatus === "cancelled") || [];
    console.log(cancelledBookings)
    return (
        <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
            <h2 className='text-base text-center mb-0 font-semibold'>{userRole === "provider" ? "Bookings that were cancelled by you or the customer." : "Bookings that were cancelled by you or the provider."}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
                {cancelledBookings?.length > 0
                    ? cancelledBookings.map((booking, index) => (
            <BookingCard key={index} bookingCardData={booking}/>
                    ))
                    : userRole === "provider"
            ? <h2 className='md:col-span-2 lg:col-span-3 text-center py-8 text-5xl text-accent'>You don’t have <br />any <span className='text-red-500'>cancelled</span> bookings<br /> at the moment.</h2>
          : <h2 className='md:col-span-2 lg:col-span-3 text-center py-8 text-5xl text-secondary'>You don’t have <br />any <span className='text-red-500'>cancelled</span> bookings<br /> at the moment.</h2>
                }
            </div>
        </section>
    )
}

export default CancelledTab