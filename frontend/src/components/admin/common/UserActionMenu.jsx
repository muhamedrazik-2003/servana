import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BadgeCheck, Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';


const UserActionMenu = ({ userId, userRole }) => {

    const handleDataUpdate = async (userId) => {
        console.log("update user", userId)
        // try {
        //     const dataToUpdate = {
        //         ...updatedData,
        //         updatedAt: new Date().toISOString()
        //     }
        //     await updateCurrentStudent(userId, dataToUpdate)
        //     setPageReload(prev => !prev)
        //     alert("User data updated successfully")
        // } catch (error) {
        //     alert("Error updating User Data", error.message);
        //     console.log("Error updating User Data", error.message);
        // }
    }
    const handleDataDelete = async (userId) => {
        console.log("delte user", userId)
        // try {
        //     await deleteStudent(userId)
        //     setPageReload(prev => !prev)
        //     alert("User Data deleted successfully")
        // } catch (error) {
        //     alert("Error Deleting User Data", error.message);
        //     console.log("Error Deleting User Data", error.message);
        // }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=''>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link to={`/${userRole}/${userId}`}>
                    <DropdownMenuItem className={'pl-3 pr-6'}>
                        <Eye /> View User Details
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className={'pl-3 pr-6'} onClick={() => {
                    handleDataUpdate(userId)
                }} >
                    <BadgeCheck /> Verify User
                </DropdownMenuItem>
                <DropdownMenuItem className={'pl-3 pr-6'} onClick={() => {
                    handleDataUpdate(userId)
                }} >
                    <Pencil /> Edit User Details
                </DropdownMenuItem>
                <DropdownMenuItem className={'pl-3 pr-6'} onClick={() => {
                    handleDataDelete(userId)
                }}>
                    <Trash2 /> Delete User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserActionMenu