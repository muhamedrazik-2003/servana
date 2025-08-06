import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Provider&AdminHeader'
import Footer from '../../components/common/Footer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProviderSidebar from '../../components/provider/common/ProviderSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProviderReviews, getAllReviews } from '../../redux/slices/reviewSlice'
import { ReviewCard } from '../../components/common/ReviewCard'
import { Loader2 } from 'lucide-react'
import { getAllServices, getUserServices } from '../../redux/slices/serviceSlice'
import AdminSidebar from '../../components/admin/common/AdminSidebar'
import { useLocation } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area';

export const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, isReviewLoading } = useSelector(state => state.reviewSlice);
  const [sortData, setSortData] = useState('newest');
  const { pathname } = useLocation();

  useEffect(() => {
    if (role === "admin") {
      dispatch(getAllReviews());
      dispatch(getAllServices())
    } else {
      dispatch(getAllProviderReviews());
      dispatch(getUserServices());
    }
  }, [])

  let role = ""

  if (pathname.includes('/provider')) {
    role = "provider"
  } else if (pathname.includes('/admin')) {
    role = "admin"
  } else {
    role = "seeker"
  }


  let sortedData = []
  if (sortData === "oldest") {
    sortedData = [...reviews]?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortData === "newest") {
    sortedData = [...reviews]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (sortData === "last7days") {
    sortedData = [...reviews]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 7)
  }
  console.log(sortedData)
  return (
    <>
      {role === "admin"
        ? <Header userRole={"admin"} />
        : <Header />
      }
      <main className="flex p-4 pt-0 gap-6">
        {/* Sidebar */}
        <div className="">
          {role === "admin"
            ? <AdminSidebar />
            : <ProviderSidebar />
          }
        </div>

        {/* Main Content */}
        <section className="min-h-[calc(100vh-82px)]  w-full p-0 m-0 ml-4 mr-[80px]">
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h1 className='text-[clamp(2.5rem,8vw,32px)] leading-11  md:leading-14 z-0 mb-2 text-start'>{role === "admin" ? "Service Reviews" : "Customer Reviews"}</h1>
              <p className='max-w-[400px] text-sm font-semibold p-0'>{role === "admin" ? "Monitor Reviews by Customers on Provider Services" : "Monitor Customer Reviews on your Services"}</p>
            </div>
            <Select value={sortData} onValueChange={(value) => setSortData(value)}>
              <SelectTrigger className={`w-[192px] !h-10 lg:!h-12 rounded-3xl border-2 ${role === "admin" ? "bg-violet-50 border-violet-200" : "bg-orange-100 border-orange-300"} pl-6`}>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className={`${role === "admin" ? "bg-violet-100" : "bg-orange-100"}`}>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className='flex items-start gap-4 space-y-4'>
            <div className='space-y-1'>

            </div>
          </div> */}
            <div className='grid grid-cols-1  lg:grid-cols-2 gap-4 gap-y-6 mb-20'>
              {isReviewLoading
                ? <h4 className='my-4 mb-10 flex items-center gap-2'>Reviews Loading <Loader2 className='size-5' /></h4>

                : sortedData.length > 0
                  ? sortedData.map((review) => (
                    <>
                      <ReviewCard review={review} userRole={role} />
                    </>
                  ))
                  : <h4 className='my-4 mb-10'>No Reviews Available Currently</h4>
              }
            </div>
        </section>
      </main>
      {role !== "admin"
        && <Footer userRole={"provider"} />
      }
    </>
  )
}
