import React from 'react'
import BookingCard from '../common/BookingCard'

function CancelledTab({userRole}) {
    return (
       <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
            <h2 className='text-base text-center mb-0 font-semibold'>{userRole === "provider" ? "Bookings that were cancelled by you or the customer." : "Bookings that were cancelled by you or the provider."}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
                <BookingCard userRole={userRole}/>
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
            </div>
        </section>
    )
}

export default CancelledTab