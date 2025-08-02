import React from 'react'
import { Card } from '../../components/ui/card'
import { Separator } from "../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';

function AdminDashboard() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const DateToday = new Date().toDateString().slice(0, 10)
  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <section className="h-[calc(100vh-82px)]  grid grid-cols-2  w-full m-0 gap-4 p-0 overflow-hidden">
          <h1 className="m-0 text-2xl">Welcome <span className="text-primary">{user?.fullName}</span>, Today is {DateToday}</h1>

          <div className='space-y-4'>
            <div className='flex items-center justify-end gap-3 px-4'>
              <h1>Welcome</h1>
            </div>
            {/* <SummarySection /> */}
            {/* <p>summary section</p>
            <div className='border rounded-3xl p-4 overflow-auto scrollbar-none max-h-83 row-span-2'>
              <div className='flex justify-between items-center mb-3'>
                <h4 className='px-2  text-accent'>Recent Bookings</h4>
                <Link to={'/provider/bookings'}>
                  <Button variant={'outline'} size={'sm'} className={'h-8'}> View All Bookings</Button>
                </Link>
              </div>
              <SampleTable headData={headData} bodyData={formattedBooking} formMode={"booking"} />
            </div>
          </div>
          <div className='space-y-2'>
            <BookingStatusChart />
            <div>
              <div className='flex items-center justify-between'>
                <h4 className='px-2 mb-2 text-accent'>My services</h4>
                <Link to={'/provider/services'}>
                  <Button variant={'outline'} size={'sm'} className={'h-6'}> View Services</Button>
                </Link>
              </div>
              <div className='overflow-x-auto flex gap-2 scrollbar-none'>
                {isLoading
                  ? <h4 className='my-4 mb-10 flex items-center gap-2'>Services Loading <Loader2 className='size-5 animate-spin' /></h4>

                  : services.length > 0
                    ? services.map(serivce => (
                      <MiniServiceCard data={serivce} />

                    ))

                    : <h4 className='my-4 mb-10'>No Services Available Currently</h4>
                }
              </div>
            </div>

            <div className=''>
              <div className='flex items-center justify-between'>
                <h4 className='px-2 mb-2 text-accent'>Most recent Reviews</h4>
                <Link to={'/provider/reviews'}>
                  <Button variant={'outline'} size={'sm'} className={'h-6'}> View Reviews</Button>
                </Link>
              </div>
              <div className='flex flex-col gap-2 overflow-y-auto scrollbar-none max-h-43 px-2'>
                {isReviewLoading
                  ? <h4 className='my-4 mb-10 flex items-center gap-2'>Reviews Loading <Loader2 className='size-5 animate-spin' /></h4>

                  : reviews.length > 0
                    ? reviews.map((review) => (
                      <MiniReviewCard reviewData={review} />
                    ))
                    : <h4 className='my-4 mb-10'>No Reviews Available Currently</h4>
                }
              </div>
            </div>
          </div>
          <div> */}

          </div>

        </section>
      </main >
    </>
  );
}

export default AdminDashboard