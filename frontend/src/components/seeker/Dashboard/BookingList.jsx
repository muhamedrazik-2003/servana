import React from 'react'
import BookingCard from '../common/BookingCard'

function BookingList() {
    return (
        <section className='pb-30'>
            <h2 className='text-2xl md:text-4xl mb-1'>Currently Scheduled for You</h2>
            <p className='text-base mb-10'>These are the services currently in progress or lined up next.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
                <BookingCard />
                <BookingCard />
                <BookingCard />
            </div>
        </section>
    )
}

export default BookingList