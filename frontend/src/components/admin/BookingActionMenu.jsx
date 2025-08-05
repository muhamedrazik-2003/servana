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
import { Ban, Bolt, Calendar, CircleCheckBig, CircleSlash, CircleSlash2, CreditCard, Ellipsis, Eye, Loader2, Power, PowerOff, Trash2, UserPen } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { changeServiceStatus, deleteService } from '../../redux/slices/serviceSlice';
import { changeBookingAndPaymentStatus } from '../../redux/slices/bookingSlice';

function BookingActionMenu({ bookingId }) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { bookings, isDeleting, isUpdating } = useSelector(state => state.bookingSlice);
    const currentBooking = bookings.find(booking => booking._id === bookingId)


    const handleBookingStatusUpdate = async (bookingStatus, paymentStatus) => {
        try {

            const bookingData = { bookingStatus, paymentStatus, reason: "Action Taken By Admin" }
            console.log(bookingId, bookingData)
            const response = await dispatch(changeBookingAndPaymentStatus({ bookingId, bookingData }));
            if (changeBookingAndPaymentStatus.fulfilled.match(response)) {
                toast.success("Booking Status updated successfully!")
                return;
            } else if (changeBookingAndPaymentStatus.rejected.match(response)) {
                return toast.error(response.payload?.message || "Something went wrong while updating Booking Status");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An unexpected error occurred");
        }
    }
    //   const handleDelete = async () => {
    //     const response = await dispatch(deleteService(serviceId));
    //     if (deleteService.fulfilled.match(response)) {
    //       toast.success("Service Delete successfully!");
    //       return;
    //     } else if (deleteService.rejected.match(response)) {
    //       return toast.error(response.payload?.message || "Something went wrong while Deleting the service");

    //     }
    //   }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className=''>
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className='space-x-2 px-3'><CreditCard className='text-gray-500 size-5' />Payment Status</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {currentBooking?.paymentStatus === "pending"
                                    ? <>
                                        <DropdownMenuItem
                                            onClick={() => handleBookingStatusUpdate(currentBooking.bookingStatus, "paid")}>
                                            <CircleCheckBig className="mr-2 w-4 h-4" /> Payment Paid
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleBookingStatusUpdate(currentBooking.bookingStatus, "cancelled")}>
                                            <CircleSlash2 className="mr-2 w-4 h-4" /> Payment Cancelled
                                        </DropdownMenuItem>
                                    </>
                                    : <DropdownMenuItem
                                        onClick={() => handleBookingStatusUpdate(currentBooking.bookingStatus, "cancelled")}>
                                        <CircleSlash2 className="mr-2 w-4 h-4" /> Payment Cancelled
                                    </DropdownMenuItem>
                                }
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className='space-x-2 px-3'><Calendar className='text-gray-500 size-5' />Booking Actions</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    onClick={() => handleBookingStatusUpdate("ongoing", currentBooking.paymentStatus)}>
                                    <CircleCheckBig className="mr-2 w-4 h-4" /> mark As Ongoing
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleBookingStatusUpdate("completed", currentBooking.paymentStatus)}>
                                    <CircleCheckBig className="mr-2 w-4 h-4" /> mark As Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleBookingStatusUpdate("cancelled", currentBooking.paymentStatus)}>
                                    <CircleSlash2 className="mr-2 w-4 h-4" /> Mark As Cancelled
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleBookingStatusUpdate("failed", currentBooking.paymentStatus)}>
                                    <CircleSlash2 className="mr-2 w-4 h-4" /> Mark As Failed
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <Link to={`/admin/bookings/${bookingId}`}>
                        <DropdownMenuItem className={'pl-3 pr-6'}>
                            <Eye /> View Booking Details
                        </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem className={'pl-3 pr-6'}
                        onClick={() => handleStatusUpdate(true, currentBooking?.status)}
                    >
                        <BadgeCheck /> 
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuItem className={'pl-3 pr-6 text-red-500'} onClick={() => {
                        setIsOpen(true)
                    }}>
                        <Trash2 className='text-red-500' /> Delete Service

                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu >

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={`rounded-2xl p-6`}>
                    <DialogTitle className='mb-1'>Are you sure you want to delete this Service?</DialogTitle>
                    <p className='mb-3  text-sm'>This action Cannot be undone.This will permanently delete This Service and Remove it from the server</p>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant={'outline2'}>Close</Button>
                        </DialogClose>
                        <Button
                            onClick={() => {
                                handleDelete()
                            }}
                            variant="destructive" className="">{isDeleting ? <> <Loader2 className='size-4 animate-spin mr-2' /> Deleting Service</> : "Delete Service"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BookingActionMenu