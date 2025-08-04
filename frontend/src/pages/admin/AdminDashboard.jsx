import React, { useEffect } from 'react'
import { Separator } from "../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import { useDispatch } from 'react-redux';
import { getAllBookings } from '../../redux/slices/bookingSlice';
import { CustomerProviderRadarChart } from '../../components/customer-provider-radar-chart';
import { BusinessMetricsDonutChart } from '../../components/business-metrics-donut-chart';
import AdminSummaryCard from '../../components/admin/dashboard/AdminSummaryCard';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import SampleTable from '../../components/provider/common/SampleTable';
import RecentBooking from '../../components/common/RecentBooking';

function AdminDashboard() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const DateToday = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
    // dispatch(getUserServices());
    // dispatch(getAllProviderReviews());
  }, [])


  return (
    <>
      <Header />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <AdminSidebar />
        </div>
        {/* Main Content */}
        <section className="h-[calc(100vh-82px)]  grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto_1fr_1.3fr] g  w-full m-0 gap-4 p-0 overflow-hidden">
          <div className='h-auto'>
            <h1 className="m-0 text-3xl text-start">Welcome <span className="text-primary">{user?.fullName}</span></h1>
            <p>Today is <span className='italic font-semibold'>{DateToday}</span></p>
          </div>
          <AdminSummaryCard />
          <div className='grid grid-cols-2 gap-4'>
            <BusinessMetricsDonutChart />
            <CustomerProviderRadarChart />
          </div>
          <div className='space-y-2 lg:col-span-2'>
            <div className='grid grid-cols-2 gap-4'>
              <RecentBooking  userRole={"admin"}/>
              {/* <RecentBooking userRole={"admin"}/> */}
              {/* <RecentBooking /> */}
            </div>


            {/* <div> */}


            {/* {isLoading
                  ? <h4 className='my-4 mb-10 flex items-center gap-2'>Services Loading <Loader2 className='size-5 animate-spin' /></h4>

                  : services.length > 0
                    ? services.map(serivce => (
                      <MiniServiceCard data={serivce} />
                      <SampleTable/>

                    ))

                    : <h4 className='my-4 mb-10'>No Services Available Currently</h4>
                } */}
            {/* </div> */}

            {/* <div className=''>
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
            </div> */}
          </div>

        </section>
      </main >
    </>
  );
}

export default AdminDashboard