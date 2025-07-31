import React from 'react'
import Footer from '../../components/common/Footer'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import { Calendar, CheckCircle, Clock, IndianRupee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSelector } from 'react-redux'

function ProviderEarning() {
  const { bookings } = useSelector(state => state.bookingSlice)
  const totalEarnings = bookings.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const bookingsThisWeek = bookings.filter(booking => {
    const createdAt = new Date(booking.createdAt);
    return createdAt >= sevenDaysAgo && createdAt <= now;
  }); 

  const totalEarningsThisWeek = bookingsThisWeek.reduce((prev, current) => parseFloat(current.totalPrice) + prev, 0)

  const pendingPayments = bookings.reduce((prev, current) => {
    if(current.paymentStatus === "pending") {
      return prev + parseFloat(current.totalPrice)
    }
    return prev
  }, 0)
  const completedPayments = bookings.reduce((prev, current) => {
    if(current.paymentStatus === "paid") {
      return prev + parseFloat(current.totalPrice)
    }
    return prev
  }, 0)

  const summaryData = [
    {
      title: "Total Earnings",
      value: `₹ ${totalEarnings > 0 ? totalEarnings : 0}`,
      icon: IndianRupee,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Last & Days",
      value: `₹ ${totalEarningsThisWeek > 0 ? totalEarningsThisWeek : 0}`,
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
        <section className="min-h-[calc(100vh-82px)]  w-full p-0 m-0 mr-[80px] space-y-6">
          <div>
            <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>Your Earnings</h1>
            <p className='text-sm font-semibold p-0'>Monitor Your total income, pending amounts, and transaction history.</p>
          </div>
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className='grid grid-cols-2 gap-4'>
              {summaryData.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card
                    key={index}
                    className="relative overflow-hidden border shadow-sm border-orange-100 hover:shadow-xl transition-shadow duration-300 gap-0 py-3 pb-4"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                      <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
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

            </div>
          </div>


        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default ProviderEarning