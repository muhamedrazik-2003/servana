import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function ServiceCardSkelton({cardCount, variant}) {
    return (
        Array.from({length : cardCount}).map((_,index) => (
            <div key={index} className='mb-6'>
                <Skeleton className={`shrink-0 rounded-3xl ${variant === "provider" ? "w-78 h-44" : "w-66 h-66"}`} />
                <div className='flex justify-between ml-2 mr-4 mt-5'>
                    <Skeleton className={`shrink-0 w-30 h-4 rounded-full`} />
                    <Skeleton className={`shrink-0 w-15 h-4 rounded-full`} />
                </div>
                <div className='mx-2 space-y-2 mt-4'>
                    <Skeleton className={`shrink-0 w-45 h-3 rounded-full`} />
                    <Skeleton className={`shrink-0 w-40 h-3 rounded-full`} />
                </div>
            </div>
        ))
    )
}

export default ServiceCardSkelton