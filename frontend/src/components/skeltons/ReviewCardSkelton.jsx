import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function ReviewCardSkelton() {
  return (
    <div className='shrink-0 w-80 h-60 rounded-3xl border shadow-sm flex flex-col justify-between '>
      <div>
        <Skeleton className='w-30 h-4 m-4 mb-2 rounded-full' />
        <Skeleton className='w-40 h-4 m-4 mt-2 rounded-full' />
        <Skeleton className='w-70 h-4 m-4 mt-8 mb-2 rounded-full' />
        <Skeleton className='w-70 h-4 m-4 my-2 rounded-full' />
        <Skeleton className='w-70 h-4 m-4 my-2 rounded-full' />
      </div>
      <div>
        <Skeleton className='w-40 h-4 m-4 rounded-full' />
      </div>
      {/* <Skeleton className='w-80 h-60 rounded-3xl shrink-0' /> */}
    </div>
  )
}

export default ReviewCardSkelton