import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function ReviewCardSkelton({variant}) {
  return (
    <div className={`shrink-0 ${variant === "provider" ? "w-full lg:w-120 h-50" : "w-80 h-60"} rounded-3xl border shadow-sm flex flex-col justify-between `}>
      <div>
        <Skeleton className='w-30 h-4 m-4 mb-2 rounded-full' />
        <Skeleton className='w-40 h-4 m-4 mt-2 rounded-full' />
        <Skeleton className={`${variant === "provider" ? "w-80 lg:w-110 h-4 mt-6" : "w-70 h-4 mt-8"} m-4  mb-2 rounded-full`} />
        <Skeleton className={`${variant === "provider" ? "w-80 lg:w-110 h-4" : "w-70 h-4"}  m-4 my-2 rounded-full`} />
        <Skeleton className={`${variant === "provider" ? "w-80 lg:w-110 h-4" : "w-70 h-4"}  m-4 my-2 rounded-full`} />
      </div>
      <div>
        <Skeleton className='w-40 h-4 m-4 rounded-full' />
      </div>
      {/* <Skeleton className='w-80 h-60 rounded-3xl shrink-0' /> */}
    </div>
  )
}

export default ReviewCardSkelton