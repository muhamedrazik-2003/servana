import React from 'react'
import SeekerHeader from '../../components/seeker/common/SeekerHeader'
import Footer from '../../components/common/Footer'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
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
          <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww"
              alt=""
              className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
            />
            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
            <CardContent className="px-4 pt-0 pb-6">
              <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">Ac Repair</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Calicut, Kerala
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                20 providers available
              </div>
            </CardContent>
          </Card>
          <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww"
              alt=""
              className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
            />
            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
            <CardContent className="px-4 pt-0 pb-6">
              <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">Ac Repair</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Calicut, Kerala
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                20 providers available
              </div>
            </CardContent>
          </Card>
          <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww"
              alt=""
              className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
            />
            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
            <CardContent className="px-4 pt-0 pb-6">
              <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">Ac Repair</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Calicut, Kerala
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                20 providers available
              </div>
            </CardContent>
          </Card>
          <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww"
              alt=""
              className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
            />
            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
            <CardContent className="px-4 pt-0 pb-6">
              <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">Ac Repair</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Calicut, Kerala
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                20 providers available
              </div>
            </CardContent>
          </Card>
          <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww"
              alt=""
              className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
            />
            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
            <CardContent className="px-4 pt-0 pb-6">
              <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">Ac Repair</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Calicut, Kerala
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                20 providers available
              </div>
            </CardContent>
          </Card>
          <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <img
              src="https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww"
              alt=""
              className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
            />
            <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
            <CardContent className="px-4 pt-0 pb-6">
              <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">Ac Repair</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                Calicut, Kerala
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                20 providers available
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer userRole={"seeker"} />
    </main>
  )
}

export default AllServices