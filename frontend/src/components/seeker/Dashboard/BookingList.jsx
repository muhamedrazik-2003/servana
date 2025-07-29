import React, { useEffect } from 'react'
import BookingCard from '../common/BookingCard'
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from '../../../redux/slices/bookingSlice';

function BookingList() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserBookings());
    }, [])
    const { bookings } = useSelector(state => state.bookingSlice);
    const upcomingBookings = bookings.filter(booking => booking.bookingStatus === "pending") || [];
    const ongoingBookings = bookings.find(booking => booking.bookingStatus === "ongoing") || [];


    // console.log(bookings)
    return (
        <section className='pb-30'>
            <h2 className='text-2xl md:text-4xl mb-1'>Currently Scheduled for You</h2>
            <p className='text-base mb-10'>These are the services currently in progress or lined up next.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
                {ongoingBookings?.length > 0
                    ? ongoingBookings.map((booking, index) => (
                        <BookingCard key={index} bookingCardData={booking} />
                    ))
                    : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-5xl text-secondary'>You don’t have <br/>any <span className='text-primary'>ongoing</span> bookings<br/> at the moment.</h2>
                }
            </div>
        </section>
    )
}

export default BookingList