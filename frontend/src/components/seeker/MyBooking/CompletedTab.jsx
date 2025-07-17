import React from 'react'
import BookingCard from '../common/BookingCard'

function CompletedTab() {
  return (
    <section>
            <h2 className='text-base text-center mb-4 font-semibold'>Your past completed services appear here for reference..</h2>
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

export default CompletedTab