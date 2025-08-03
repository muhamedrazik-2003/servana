import React, { useEffect } from 'react'
import { Separator } from "../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from '../../components/common/Provider&AdminHeader';
import AdminSidebar from '../../components/admin/common/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  UserCheck,
  FolderKanban,
  Star,
  CalendarDays,
  Handshake,
  Briefcase,
  Layers3,
  ThumbsUp,
  BarChart3,
} from "lucide-react";
import BookingStatusChart from '../../components/provider/Dashboard/BookingStatusChart';
import { useDispatch } from 'react-redux';
import { getAllBookings } from '../../redux/slices/bookingSlice';
import { CustomerProviderRadarChart } from '../../components/customer-provider-radar-chart';
import { BusinessMetricsDonutChart } from '../../components/business-metrics-donut-chart';

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

  const summaryData = [
    {
      title: "Total Bookings",
      value: `100`,
      icon: Handshake, // 🤝 Booking representation
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Services",
      value: `₹3454`,
      icon: Briefcase, // 🧰 Services offered
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Customers",
      value: `45`,
      icon: Users, // 👥 Users/customers
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Active Providers",
      value: `567`,
      icon: UserCheck, // 👤 Checked user = active provider
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Categories",
      value: `45`,
      icon: Layers3, // 🗂 Category-like stack
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Total Reviews",
      value: `567`,
      icon: Star, // ⭐ Review/star icon
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

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
          <div className='grid grid-cols-2 row-span-2 gap-2'>
            {summaryData.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border shadow-sm bg-linear-to-br from-orange-50 via-violet-100 to-teal-100 hover:shadow-xl transition-shadow duration-300 gap-0 py-2 pb-4"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                    <CardTitle className="text-sm font-medium text-primary">{item.title}</CardTitle>
                    <div className={`p-2 rounded-full ${item.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <BusinessMetricsDonutChart/>
            <CustomerProviderRadarChart/>
          </div>
          {/* <BookingStatusChart /> */}

          {/* <div className='space-y-2'>
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
          <div>  

          </div>*/}

        </section>
      </main >
    </>
  );
}

export default AdminDashboard