import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function ServiceCardSkelton() {
    return (
        [1, 2, 3, 4].map(skelton => (
            <div className='mb-6'>
                <Skeleton className={`shrink-0 w-66 h-66`} />
                <div className='flex justify-between ml-2 mr-4 mt-5'>
                    <Skeleton className={`shrink-0 w-30 h-4 rounded-full`} />
                    <Skeleton className={`shrink-0 w-15 h-4 rounded-full`} />
                </div>
                <div className='mx-2 space-y-2 mt-4'>
                    <Skeleton className={`shrink-0 w-45 h-3 rounded-full`} />
                    <Skeleton className={`shrink-0 w-35 h-3 rounded-full`} />
                </div>
            </div>
        ))
    )
}

export default ServiceCardSkelton