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
import { Ban, Bolt, CircleCheckBig, CircleSlash, CircleSlash2, Ellipsis, Eye, Loader2, Power, PowerOff, Trash2, UserPen } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { deleteService } from '../../redux/slices/serviceSlice';

function ServiceActionMenu({ serviceId }) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { services, isDeleting, isUpdating } = useSelector(state => state.serviceSlice);
    const currentService = services.find(service => service._id === serviceId)

      const handleDelete = async () => {
        const response = await dispatch(deleteService(serviceId));
        if (deleteService.fulfilled.match(response)) {
          toast.success("Service Delete successfully!");
          return;
        } else if (deleteService.rejected.match(response)) {
          return toast.error(response.payload?.message || "Something went wrong while Deleting the service");
    
        }
      }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className=''>
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className='space-x-2 px-3'><Bolt className='text-gray-500 size-5' /> Service Status</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {currentService?.status === "pending"
                                    ? <>
                                        <DropdownMenuItem
                                            onClick={() => handleBookingStatusUpdate("active")}>
                                            <CircleCheckBig className="mr-2 w-4 h-4" /> Approve Service
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleBookingStatusUpdate("rejected")}>
                                            <CircleSlash2 className="mr-2 w-4 h-4" /> Reject Service
                                        </DropdownMenuItem>
                                    </>
                                    : currentService?.status === "active"
                                        ? <>
                                            <DropdownMenuItem
                                                onClick={() => handleBookingStatusUpdate(currentService?.isVerified, "flagged")}
                                            ><Ban />Flag Service</DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleBookingStatusUpdate(currentService?.isVerified, "inactive")}
                                            ><PowerOff /> Disable Service</DropdownMenuItem>
                                        </>
                                        : <>
                                            <DropdownMenuItem
                                                onClick={() => handleBookingStatusUpdate(currentService?.isVerified, "active")}
                                            ><Power /> Enable Service</DropdownMenuItem>
                                        </>
                                }
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <Link to={`/admin/services/${serviceId}`}>
                        <DropdownMenuItem className={'pl-3 pr-6'}>
                            <Eye /> View Service Details
                        </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem className={'pl-3 pr-6'}
                        onClick={() => handleBookingStatusUpdate(true, currentService?.status)}
                    >
                        <BadgeCheck /> 
                    </DropdownMenuItem> */}
                    <DropdownMenuItem className={'pl-3 pr-6 text-red-500'} onClick={() => {
                        setIsOpen(true)
                    }}>
                        <Trash2 className='text-red-500' /> Delete Service

                    </DropdownMenuItem>
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

export default ServiceActionMenu