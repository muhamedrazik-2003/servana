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
import { BadgeCheck, Ban, Ellipsis, Eye, Loader2, Pencil, Power, PowerOff, Trash2, UserPen } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeProviderAccountStatus, changeSeekerAccountStatus, deleteProvider, deleteSeeker } from '../../../redux/slices/userSlice';
import { toast } from 'sonner';


const UserActionMenu = ({ userId, userRole }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { seekers, providers, isUpdating, isDeleting } = useSelector(state => state.userSlice);
    let currentUser = {}
    if (userRole === "provider") {
        currentUser = providers.find(seeker => seeker._id === userId)
    } else {
        currentUser = seekers.find(seeker => seeker._id === userId)
    }
    const dispatch = useDispatch();
    // console.log(currentUser)

    const handleBookingStatusUpdate = async (verification, accountStatus) => {
        try {
            const userId = currentUser._id;
            const updatedData = { verification, accountStatus }
            console.log(userId, updatedData)
            if (userRole === "provider") {
                const response = await dispatch(changeProviderAccountStatus({ userId, updatedData }));
                if (changeProviderAccountStatus.fulfilled.match(response)) {
                    toast.success("User Account Status updated successfully!")
                    return;
                } else if (changeProviderAccountStatus.rejected.match(response)) {
                    return toast.error(response.payload?.message || "Something went wrong while updating User Account Status");
                }
            } else {
                const response = await dispatch(changeSeekerAccountStatus({ userId, updatedData }));
                if (changeSeekerAccountStatus.fulfilled.match(response)) {
                    toast.success("User Account Status updated successfully!")
                    return;
                } else if (changeSeekerAccountStatus.rejected.match(response)) {
                    return toast.error(response.payload?.message || "Something went wrong while updating User Account Status");
                }
            }

        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An unexpected error occurred");
        }
    }
    const handleUserDelete = async () => {
        try {
            if (userRole === "provider") {
                const response = await dispatch(deleteProvider(userId));
                if (deleteProvider.fulfilled.match(response)) {
                    toast.success("User Deleted successfully!")
                    setIsOpen(false)
                    return;
                } else if (deleteProvider.rejected.match(response)) {
                    return toast.error(response.payload?.message || "Something went wrong while Deleting User");
                }
            } else {
                const response = await dispatch(deleteSeeker(userId));
                if (deleteSeeker.fulfilled.match(response)) {
                    toast.success("User Deleted successfully!")
                    setIsOpen(false)
                    return;
                } else if (deleteSeeker.rejected.match(response)) {
                    return toast.error(response.payload?.message || "Something went wrong while Deleting User");
                }
            }

        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An unexpected error occurred");
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
                        <DropdownMenuSubTrigger className='space-x-2 px-3'><UserPen className='text-gray-500 size-5' /> Account Status</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {currentUser?.status === "active"
                                    ? <>
                                        <DropdownMenuItem
                                            onClick={() => handleBookingStatusUpdate(currentUser?.isVerified, "banned")}
                                        ><Ban /> Ban User</DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleBookingStatusUpdate(currentUser?.isVerified, "inactive")}
                                        ><PowerOff /> Deactivate User</DropdownMenuItem>
                                    </>
                                    : <DropdownMenuItem
                                        onClick={() => handleBookingStatusUpdate(currentUser?.isVerified, "active")}
                                    >
                                        <Power className="mr-2 w-4 h-4" /> Activate User</DropdownMenuItem>
                                }
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <Link to={`/${userRole}/${userId}`}>
                        <DropdownMenuItem className={'pl-3 pr-6'}>
                            <Eye /> View User Details
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className={'pl-3 pr-6'}
                        onClick={() => handleBookingStatusUpdate(true, currentUser?.status)}
                    >
                        <BadgeCheck /> Verify User
                    </DropdownMenuItem>
                    <DropdownMenuItem className={'pl-3 pr-6 text-red-500'} onClick={() => {
                        setIsOpen(true)
                    }}>
                        <Trash2 className='text-red-500' /> Delete User

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={`rounded-2xl p-6`}>
                    <DialogTitle className='mb-1'>Are you sure you want to delete this user?</DialogTitle>
                    <p className='mb-3  text-sm'>This action Cannot be undone.This will permanently delete This user and Remove it from the server</p>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant={'outline2'}>Close</Button>
                        </DialogClose>
                        <Button
                            onClick={() => {
                                handleUserDelete()
                            }}
                            variant="destructive" className="">{isDeleting ? <> <Loader2 className='size-4 animate-spin mr-2' /> Deleting User</> : "Delete User"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UserActionMenu