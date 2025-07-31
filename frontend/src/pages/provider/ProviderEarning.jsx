import React, { useEffect } from 'react'
import Footer from '../../components/common/Footer'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import { Calendar, CheckCircle, Clock, IndianRupee } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from 'react-redux'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getProviderBookings } from '../../redux/slices/bookingSlice'

function ProviderEarning() {
  const { bookings } = useSelector(state => state.bookingSlice)
  const dispatch = useDispatch();
  useEffect(() => {
    if (bookings.length === 0) {
      dispatch(getProviderBookings())
    }
  }, [])
  const totalEarnings = bookings.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)
  
  const now = new Date();
  const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  // Week boundaries
  const thisWeekStart = getDaysAgo(7);     // 0–7 days ago
  const oneWeekAgoStart = getDaysAgo(14);  // 7–14 days ago
  const twoWeeksAgoStart = getDaysAgo(21); // 14–21 days ago
  const threeWeeksAgoStart = getDaysAgo(28); // 21–28 days ago

  // Filters
  const bookingsThisWeek = bookings.filter((booking) => {
    const createdAt = new Date(booking.createdAt);
    return createdAt >= thisWeekStart && createdAt <= now;
  });

  const bookings1WeekAgo = bookings.filter((booking) => {
    const createdAt = new Date(booking.createdAt);
    return createdAt >= oneWeekAgoStart && createdAt < thisWeekStart;
  });

  const bookings2WeeksAgo = bookings.filter((booking) => {
    const createdAt = new Date(booking.createdAt);
    return createdAt >= twoWeeksAgoStart && createdAt < oneWeekAgoStart;
  });

  const bookings3WeeksAgo = bookings.filter((booking) => {
    const createdAt = new Date(booking.createdAt);
    return createdAt >= threeWeeksAgoStart && createdAt < twoWeeksAgoStart;
  });



  const totalEarningsThisWeek = bookingsThisWeek.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)
  const totalEarnings1weekAgo = bookings1WeekAgo.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)
  const totalEarnings2weekAgo = bookings2WeeksAgo.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)
  const totalEarningsThisMonth = bookings3WeeksAgo.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)

  const pendingPayments = bookings.reduce((prev, current) => {
    if (current.paymentStatus === "pending") {
      return prev + parseFloat(current.totalPrice)
    }
    return prev
  }, 0)
  const completedPayments = bookings.reduce((prev, current) => {
    if (current.paymentStatus === "paid") {
      return prev + parseFloat(current.totalPrice)
    }
    return prev
  }, 0)
  console.log(totalEarningsThisMonth)
  const weeklyEarningsData = [
    { week: "Week 1", earnings: totalEarningsThisMonth },
    { week: "Week 2", earnings: totalEarnings2weekAgo },
    { week: "Week 3", earnings: totalEarnings1weekAgo },
    { week: "Week 4", earnings: totalEarningsThisWeek },
  ];

  const chartConfig = {
    earnings: {
      label: "Earnings",
      color: "var(--chart-1)", // fallback variable (set in Tailwind config or global CSS)
    },
  };

  const summaryData = [
    {
      title: "Total Earnings",
      value: `₹ ${totalEarnings > 0 ? totalEarnings : 0}`,
      icon: IndianRupee,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "This Month",
      value: `₹ ${totalEarningsThisMonth > 0 ? totalEarningsThisMonth : 0}`,
      icon: Calendar,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Payouts",
      value: `₹ ${pendingPayments > 0 ? pendingPayments : 0}`,
      icon: Clock,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed Payouts",
      value: `₹ ${completedPayments > 0 ? completedPayments : 0}`,
      icon: CheckCircle,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]
  return (
    <>
      <ProviderHeader />
      <main className="flex p-4 pt-5 gap-6">
        {/* Sidebar */}
        <div className="">
          <ProviderSidebar />
        </div>

        {/* Main Content */}
        <section className="min-h-[calc(100vh-82px)]  w-full p-0 m-0 space-y-6">
          <div>
            <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>Your Earnings</h1>
            <p className='text-sm font-semibold p-0'>Monitor Your total income, pending amounts, and transaction history.</p>
          </div>
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <div className='grid grid-cols-2 gap-4'>
              {summaryData.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card
                    key={index}
                    className="relative overflow-hidden border shadow-sm border-orange-100 hover:shadow-xl transition-shadow duration-300 gap-0 py-3 pb-4"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                      <CardTitle className="text-sm font-medium text-accent">{item.title}</CardTitle>
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
            <div>
              <Card className="w-full p-0 pt-4 gap-1">
                <CardHeader>
                  <CardTitle className='text-accent'>Weekly Earnings</CardTitle>
                </CardHeader>
                <CardContent className='pr-4 pl-1'>
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      data={weeklyEarningsData}
                      margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="var(--color-earnings)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--color-earnings)"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis
                        dataKey="week"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs"
                        tickFormatter={(value) => `₹${value.toLocaleString()}`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) => value}
                            formatter={(value) => [
                              `₹${Number(value).toLocaleString()}`,
                              "Earnings",
                            ]}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="earnings"
                        stroke="var(--color-earnings)"
                        strokeWidth={2}
                        fill="url(#fillEarnings)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>


        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default ProviderEarning