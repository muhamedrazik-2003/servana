import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import SampleTable from '../provider/common/SampleTable';

function RecentBooking({ userRole }) {
    const { bookings } = useSelector(state => state.bookingSlice);

    const headData = ["Booking ID", "Service Title", "Customer", "Date", "Total Amount", "Booking Status"]
    const recentBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 7)

    const formattedBooking = recentBookings.map(booking => {
        return { bookingId: booking._id, serviceTitle: booking.serviceId.title, customer: booking.seekerId.fullName, date: booking.updatedAt.slice(0, 10), amount: booking.totalPrice, status: booking.bookingStatus }
    })

    return (
        <div className='border rounded-3xl p-4 row-span-2 max-h-67 w-full'>
            <div className='flex justify-between items-center mb-3'>
                <h4 className={`px-2  ${userRole === "admin" ? "text-primary" : "text-accent"}`}>Recent Bookings</h4>
                <Link to={userRole === "admin" ? '/admin/bookings' : '/provider/bookings'}>
                    <Button variant={'outline'} size={'sm'} className={'h-8'}> View All Bookings</Button>
                </Link>
            </div>
            <div className='overflow-auto scrollbar-none h-49'>
                <SampleTable headData={headData} bodyData={formattedBooking} formMode={"booking"} />

            </div>
        </div>
    )
}

export default RecentBooking