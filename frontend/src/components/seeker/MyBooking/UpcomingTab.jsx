import React from 'react'
import BookingCard from '../common/BookingCard'
import { useSelector } from 'react-redux';

function UpcomingTab({ data, userRole }) {
  console.log(data)
  const upcomingBookings = data.filter(booking => booking.bookingStatus === "pending") || [];
  const { services } = useSelector(state => state.serviceSlice);
  const { user } = useSelector(state => state.userSlice);
  console.log(upcomingBookings)
  return (
    <section className={`${userRole === "provider" ? "ml-0 mr-14" : ""}`}>
      <h2 className='text-base text-center mb-0 font-semibold'>Scheduled services that are yet to begin.</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-100px gap-5'>
        {upcomingBookings.length > 0
          ? upcomingBookings.map((booking, index) => {
            const currentService = services.find(service => service._id === booking.serviceId);
            return <BookingCard key={index} serviceDetail={currentService} userDetail={user} bookingCardData={booking} />
          })
          : <h2 className='md:col-span-2 lg:col-span-3 text-center mt-15 text-2xl'>Currently no Upcoming Bookings Available</h2>
        }

      </div>
    </section>
  )
}

export default UpcomingTab