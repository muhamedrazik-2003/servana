import React, { useEffect } from 'react'
import ProviderHeader from '../../components/provider/common/ProviderHeader'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import Footer from '../../components/common/Footer'
import { MapPin } from 'lucide-react'
import SummarySection from '../../components/provider/Dashboard/SummarySection'
import ServiceCard from '../../components/common/ServiceCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { getUserServices } from '../../redux/slices/serviceSlice'

function MyServices() {
  const { services, isLoading, } = useSelector(state => state.serviceSlice);
  const dispatch = useDispatch();
  // console.log(services)
  useEffect(() => {
    dispatch(getUserServices());
  },[])
  return (
    <>

      <ProviderHeader />
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          <ProviderSidebar />
        </div>

        {/* Main Content */}
        <section className="min-h-[calc(100vh-82px)]  w-full p-0 m-0 mr-[80px]">
          <div className='flex items-end justify-between mb-6'>
            <div>
              <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>Your Services</h1>
              <p className='max-w-[400px] text-sm font-semibold p-0'>Monitor your active and inactive services listed by you</p>
            </div>
            <div className="relative w-[340px] md:w-[590px] ml-auto">
              <MapPin className="absolute left-3 top-3 size-5 text-primary" />
              <input
                type="text"
                placeholder="Search Your Bookings..."
                className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-orange-50 dark:bg-orange-950 md:text outline-none"
              />
            </div>

          </div>
          <div className='flex items-start gap-4 space-y-4'>
            <SummarySection page={'services'} />
            <div className='space-y-1'>
              <Select>
                <SelectTrigger className="w-[192px] !h-10 lg:!h-9 rounded-3xl border-2 bg-orange-100 border-orange-300 pl-6">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className='bg-orange-100'>
                  <SelectItem value="popular">Popular Service</SelectItem>
                  <SelectItem value="newest">Newest Service</SelectItem>
                  <SelectItem value="topProviders">Top Providers</SelectItem>
                  <SelectItem value="priceLowToHigh">Price Low to High</SelectItem>
                  <SelectItem value="PriceHighToLow">Price High To Low</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[192px] !h-10 lg:!h-9 rounded-3xl border-2 bg-orange-100 border-orange-300 pl-6">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className='bg-orange-100'>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactivet">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 mb-20'>
            {services?.map(service => (
              <ServiceCard variant='provider' data={service} />
            ))}
          </div>
        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default MyServices