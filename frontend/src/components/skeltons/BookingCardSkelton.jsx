import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"


function BookingCardSkelton({ cardCount }) {
    return (
        Array.from({ length: cardCount }).map(skelton => (
            <Card className="w-full max-w-md mx-auto bg-gray-50 border-2 border-gray-300 rounded-3xl">
                <div>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-5 h-5 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-6 w-20 rounded-md" />
                        </div>

                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-5 h-5 rounded-full" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-5 h-5 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <Skeleton className="h-px w-full bg-gray-300 my-4" />

                        <div className="flex items-center gap-3">
                            <Skeleton className="w-5 h-5 rounded-full" />
                            <Skeleton className="h-4 w-40" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="w-5 h-5 rounded-full" />
                            <Skeleton className="h-4 w-44" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-5 h-5 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-4 w-24 rounded-md" />
                        </div>

                        <Skeleton className="h-4 w-36" />

                        <Skeleton className="h-px w-full bg-gray-300 my-4" />

                        <div className="text-sm pb-3 flex gap-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-44" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex gap-2 pt-2 px-4 justify-end flex-wrap xl:flex-nowrap">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </CardFooter>
                </div>
            </Card>
        ))
    )
}

export default BookingCardSkelton