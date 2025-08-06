import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EllipsisVertical, Eye, Flag, Power, PowerOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { changeReviewStatus } from '../../redux/slices/reviewSlice';

function ReviewActionMenu({ reviewId }) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state.reviewSlice);
    const currentReview = reviews.find(review => review._id === reviewId)
    console.log("current review", currentReview)
    console.log("review id", reviewId)


    const handleStatusUpdate = async (status) => {
        console.log(status)
        const reviewData = { status };
        const response = await dispatch(changeReviewStatus({reviewId, reviewData}));
        if (changeReviewStatus.fulfilled.match(response)) {
          toast.success("review Status Updated successfully!");
          return;
        } else if (changeReviewStatus.rejected.match(response)) {
          return toast.error(response.payload?.message || "Something went wrong while Updating the review Status");

        }
    }
    const handleDelete = async () => {
        // const response = await dispatch(deletereview(reviewId));
        // if (deletereview.fulfilled.match(response)) {
        //   toast.success("review Delete successfully!");
        //   setIsOpen(false)
        //   return;
        // } else if (deletereview.rejected.match(response)) {
        //   return toast.error(response.payload?.message || "Something went wrong while Deleting the review");

        // }
    }
    return (
        <>
            <DropdownMenu className='z-10'>
                <DropdownMenuTrigger className=''>
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    {/* <DropdownMenuSub>
                        <DropdownMenuSubTrigger className='space-x-2 px-3'><Bolt className='text-gray-500 size-5' /> review Status</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub> */}
                    {currentReview?.status === "active"
                        ? <>
                            <DropdownMenuItem className={'pl-3 pr-6'}
                                onClick={() => handleStatusUpdate("flagged")}
                            ><Flag />Flag review</DropdownMenuItem>
                            <DropdownMenuItem className={'pl-3 pr-6'}
                                onClick={() => handleStatusUpdate("hidden")}
                            ><PowerOff />Hide review</DropdownMenuItem>
                        </>
                        : <>
                            <DropdownMenuItem
                                onClick={() => handleStatusUpdate("active")}
                            ><Power /> Enable/Un Flag review</DropdownMenuItem>
                        </>
                    }
                    <Link to={`/admin/bookings/${currentReview.bookingId?._id}`}>
                        <DropdownMenuItem className={'pl-3 pr-6'}>
                            <Eye /> View Booking Details
                        </DropdownMenuItem>
                    </Link>
                    <Link to={`/admin/services/${currentReview.serviceId?._id}`}>
                        <DropdownMenuItem className={'pl-3 pr-6'}>
                            <Eye /> View Service Details
                        </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem className={'pl-3 pr-6 text-red-500'} onClick={() => {
                        setIsOpen(true)
                    }}>
                        <Trash2 className='text-red-500' /> Delete review

                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu >

            {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={`rounded-2xl p-6`}>
                    <DialogTitle className='mb-1'>Are you sure you want to delete this review?</DialogTitle>
                    <p className='mb-3  text-sm'>This action Cannot be undone.This will permanently delete This review and Remove it from the server</p>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant={'outline2'}>Close</Button>
                        </DialogClose>
                        <Button
                            onClick={() => {
                                handleDelete()
                            }}
                            variant="destructive" className="">{isDeleting ? <> <Loader2 className='size-4 animate-spin mr-2' /> Deleting review</> : "Delete review"}</Button>
                    </div>
                </DialogContent>
            </Dialog> */}
        </>
    )
}

export default ReviewActionMenu