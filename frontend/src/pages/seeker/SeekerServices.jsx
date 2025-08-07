import React, { useEffect, useState } from 'react'
import SeekerHeader from '../../components/seeker/common/SeekerHeader'
import Footer from '../../components/common/Footer'
import { MapPin, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ServiceCard from '../../components/common/ServiceCard'
import CategoryFilter from '../../components/common/all services/CategoryFilter'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServices, handleSearch } from '../../redux/slices/serviceSlice'
import ServiceCardSkelton from '../../components/skeltons/ServiceCardSkelton.jsx'

function AllServices() {
  const { services, isLoading, servicesBackup, keywords } = useSelector(state => state.serviceSlice);
  const { filteringCategory } = useSelector(state => state.categorySlice);
  const [sortData, setSortData] = useState('popular');
  // const [searchData, setSearchData] = useState('');
  // const [noFilteredData,ata]
  // console.log(searchData)
  const dispatch = useDispatch();
  useEffect(() => {
    if (services.length === 0 && servicesBackup.length === 0) {
      dispatch(getAllServices());
    }
  }, [])
  // useEffect(() => {
  //   dispatch(handleSearch(searchData))
  // }, [searchData])

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
  let filteredServices = ""
  if (filteringCategory === "all") {
    filteredServices = sortedData
  } else {
    filteredServices = sortedData.filter((service) => {
      return service.category === filteringCategory || service.subCategory === filteringCategory
    })
  }

  return (
    <main>
      <SeekerHeader scrollValue={210} />

      <section className='mt-8 pb-5 md:pb-8 lg:pb-12'>
        <h1 className='text-[clamp(2.5rem,8vw,48px)] leading-11  md:leading-18 z-0 mb-2'>All Services</h1>
        <p className='max-w-[600px] text-sm mx-auto font-semibold text-center mb-6 p-0'>Explore top-rated services tailored to your needs.</p>
        <div className='flex gap-3 items-center justify-center'>
          <div className="relative w-[340px] md:w-[500px]">
            <Search className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
            <input
              type="text"
              defaultValue={keywords}
              onChange={(e) => dispatch(handleSearch(e.target.value))}
              placeholder="Search By Service, Location, provider, Price and more..."
              className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 outline-none"
            />
          </div>
          <Select value={sortData} onValueChange={(value) => setSortData(value)}>
            <SelectTrigger className="w-[120px] text-sm lg:w-[180px] !h-10 lg:!h-12 border-2 border-indigo-300 pl-4">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className='right-5'>
              <SelectItem value="popular" selected>Popular Services</SelectItem>
              <SelectItem value="newest">Newest Services</SelectItem>
              {/* <SelectItem value="topProviders">Top Providers</SelectItem> */}
              <SelectItem value="priceLowToHigh">Price Low to High</SelectItem>
              <SelectItem value="PriceHighToLow">Price High To Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className='grid grid-col-1 lg:grid-cols-[auto_1fr] mx-[16px] lg:mx-20 gap-3 lg:gap-8 pb-15'>
        <div className='h-fit lg:sticky top-[100px]'>
          <CategoryFilter />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 items-start'>
          {isLoading
          ? <ServiceCardSkelton cardCount={6}/>
          : filteredServices?.length > 0
            ? filteredServices.map((service, index) => (
              <ServiceCard key={index} variant='seeker' data={service} />
            ))

            : filteringCategory !== "all"
              ? <h2 className='md:col-span-2 lg:col-span-3 text-center pt-20 pb-25 text-3xl leading-10 sticky top-60'>
                Oops! We couldn't find <br /> any <span className="text-primary">services</span> under this category.<br />
                Try exploring other categories.
              </h2>

              : <h2 className='md:col-span-2 lg:col-span-3 text-center py-15 text-5xl'>We couldn’t load <br /> the <span className='text-primary'>services</span> right now.<br /> Please try again later.</h2>
          }
        </div>
      </section>
      <Footer userRole={"seeker"} />
    </main>
  )
}

export default AllServices