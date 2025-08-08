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
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state.reviewSlice);
    const currentReview = reviews.find(review => review._id === reviewId)
    // console.log("current review", currentReview)
    // console.log("review id", reviewId)


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
    return (
        <>
            <DropdownMenu className='z-10'>
                <DropdownMenuTrigger className=''>
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
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
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}

export default ReviewActionMenu