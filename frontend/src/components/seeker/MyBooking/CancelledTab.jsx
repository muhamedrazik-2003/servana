import React from 'react'
import BookingCard from '../common/BookingCard'

function CancelledTab() {
    return (
       <section>
            <h2 className='text-base text-center mb-4 font-semibold'>Bookings that were cancelled by you or the provider.</h2>
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

export default CancelledTab