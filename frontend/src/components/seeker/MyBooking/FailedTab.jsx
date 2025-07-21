import React from 'react'
import BookingCard from '../common/BookingCard'

function FailedTab({userRole}) {
    return (
        <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
            <h2 className='text-base text-center mb-0 font-semibold'>Failed bookings due to payment or system issues.</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
            </div>
        </section>
    )
}

export default FailedTab