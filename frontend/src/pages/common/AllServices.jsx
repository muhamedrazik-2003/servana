import React from 'react'
import SeekerHeader from '../../components/seeker/common/SeekerHeader'
import Footer from '../../components/common/Footer'
import { MapPin } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ServiceCard from '../../components/seeker/Dashboard/ServiceCard'
import CategoryFilter from '../../components/common/all services/CategoryFilter'

function AllServices() {
  return (
    <main>
      <SeekerHeader />

      <section className='mt-8 pb-5 md:pb-8 lg:pb-12'>
        <h1 className='text-[clamp(2.5rem,8vw,48px)] leading-11  md:leading-18 z-0 mb-2'>All Services</h1>
        <p className='max-w-[600px] text-sm mx-auto font-semibold text-center mb-6 p-0'>Explore top-rated services tailored to your needs.</p>
        <div className='flex gap-3 items-center justify-center'>
          <div className="relative w-[340px] md:w-[500px]">
            <MapPin className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
            <input
              type="text"
              placeholder="Search for services (e.g., AC repair, Cleaning)..."
              className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text-lg outline-none"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[160px] !h-10 lg:!h-12 border-2 border-indigo-300 pl-4">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular Service</SelectItem>
              <SelectItem value="newest">Newest Service</SelectItem>
              <SelectItem value="topProviders">Top Providers</SelectItem>
              <SelectItem value="priceLowToHigh">Price Low to High</SelectItem>
              <SelectItem value="PriceHighToLow">Price High To Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className='grid grid-col-1 lg:grid-cols-[auto_1fr] mx-[16px] lg:mx-20 gap-3 lg:gap-6'>
        <CategoryFilter />
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>
      <Footer userRole={"seeker"} />
    </main>
  )
}

export default AllServices