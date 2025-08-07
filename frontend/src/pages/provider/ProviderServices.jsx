import React, { useEffect, useState } from 'react'
import ProviderHeader from '../../components/common/Provider&AdminHeader'
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import Footer from '../../components/common/Footer'
import { Loader2, MapPin } from 'lucide-react'
import SummarySection from '../../components/provider/Dashboard/SummarySection'
import ServiceCard from '../../components/common/ServiceCard'
import ServiceCardSkelton from "@/components/skeltons/ServiceCardSkelton.jsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { getUserServices, handleSearch } from '../../redux/slices/serviceSlice'

function MyServices() {
  const { services, isLoading, servicesBackup, keywords } = useSelector(state => state.serviceSlice);
  const [sortData, setSortData] = useState('popular');

  const dispatch = useDispatch();
  // console.log(services)
  useEffect(() => {
    if (services.length === 0 && servicesBackup.length === 0) {
      dispatch(getUserServices());
    }
  }, [])

  const normalizedPrice = (service) => {
    if (service.priceUnit === "hour") return service.price
    if (service.priceUnit === "day") return service.price / 8
    if (service.priceUnit === "service") return service.price
    return service.price
  }

  let sortedData = []
  if (sortData === "popular") {
    sortedData = [...services]?.sort((a, b) => b.totalBookings - a.totalBookings);
  } else if (sortData === "newest") {
    sortedData = [...services]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (sortData === "priceLowToHigh") {
    sortedData = [...services]?.sort((a, b) => normalizedPrice(a) - normalizedPrice(b))
  } else if (sortData === "PriceHighToLow") {
    sortedData = [...services]?.sort((a, b) => normalizedPrice(b) - normalizedPrice(a))
  }

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
                defaultValue={keywords}
                onChange={(e) => dispatch(handleSearch(e.target.value))}
                placeholder="Search By Service, Location, provider, Price and more..."
                className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-orange-50 dark:bg-orange-950 md:text outline-none"
              />
            </div>

          </div>
          <div className='flex items-start gap-4 space-y-4'>
            <SummarySection page={'services'} />
            <div className='space-y-1'>
              <Select value={sortData} onValueChange={(value) => setSortData(value)}>
                <SelectTrigger className="w-[192px] !h-10 lg:!h-9 rounded-3xl border-2 bg-orange-100 border-orange-300 pl-6">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className='bg-orange-100'>
                  <SelectItem value="popular">Popular Service</SelectItem>
                  <SelectItem value="newest">Newest Service</SelectItem>
                  <SelectItem value="priceLowToHigh">Price Low to High</SelectItem>
                  <SelectItem value="PriceHighToLow">Price High To Low</SelectItem>
                </SelectContent>
              </Select>
              <Select disabled={true} value={sortData} onValueChange={(value) => setSortData(value)}>
                <SelectTrigger className="w-[192px] !h-10 lg:!h-9 rounded-3xl border-2 bg-orange-100 border-orange-300 pl-6">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className='bg-orange-100'>
                  <SelectItem value="popular">Popular Service</SelectItem>
                  <SelectItem value="newest">Newest Service</SelectItem>
                  <SelectItem value="priceLowToHigh">Price Low to High</SelectItem>
                  <SelectItem value="PriceHighToLow">Price High To Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 mb-20'>
            {/* {services.length > 0
              ? services?.map(service => (
                <ServiceCard variant='provider' data={service} />
              ))
              : <h2 className='md:col-span-2 lg:col-span-3 text-center mt-15 text-4xl'>currently No services Available</h2>

            } */}
            {isLoading
              ? <ServiceCardSkelton cardCount={6} variant={"provider"}/>
              : sortedData?.length > 0
                ? sortedData.map((service, index) => (
                  <ServiceCard key={index} variant='provider' data={service} />
                ))

                : keywords.length > 0
                  ? <h2 className="md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10">
                    We couldn’t find any services matching your <span className="text-primary">search</span>.<br />
                    Try a broader or different search.
                  </h2>

                  : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-3xl leading-10'>We couldn’t load <br />
                    the <span className='text-primary'>services</span> right now.<br /> Please try again later.
                  </h2>
            }
          </div>
        </section>
      </main>
      <Footer userRole={"provider"} />

    </>
  )
}

export default MyServices