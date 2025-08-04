import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import StudentActionMenu from './StudentActionMenu';
import StudentProfileDialog from './StudentProfileDialog';
import { useSelector } from 'react-redux';
import { getStatusClass } from '../../../lib/utils';
import UserActionMenu from './UserActionMenu';

const DataTable = ({ headData, rowData, tableFormat }) => {
    const { bookings } = useSelector(state => state.bookingSlice);
    const { services } = useSelector(state => state.serviceSlice);
    const handleSeekerTotalBooking = (seekerId) => {
        const seekerBookings = bookings.filter(booking => booking.seekerId._id === seekerId)
        return seekerBookings.length
    }
    const handleProviderTotalServices = (providerId) => {
        const providerServices = services.filter(service => service.providerId._id === providerId)
        return providerServices.length
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headData?.map(data => (
                        <TableHead className='last:text-center font-bold'>{data}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rowData.map((data) => (
                    <>
                        {tableFormat === "seeker"
                            && // seeker row
                            <TableRow>
                                <TableCell>{data.fullName}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>
                                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </TableCell>
                                <TableCell>{handleSeekerTotalBooking(data._id)}</TableCell>
                                {/* <TableCell>{data?.location.city + ", " + data?.location.state + ", " + data?.location.pincode}</TableCell> */}
                                <TableCell className='text-center'>
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.status
                                        )}`}
                                    >
                                        {data.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <UserActionMenu userId={data._id} userRole={"provider"} />
                                </TableCell>
                            </TableRow>
                        }
                        {tableFormat === "provider"
                            && // seeker row
                            <TableRow>
                                <TableCell>{data.fullName}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>
                                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </TableCell>
                                <TableCell>{handleProviderTotalServices(data._id)}</TableCell>
                                {/* <TableCell>{data?.location.city + ", " + data?.location.state + ", " + data?.location.pincode}</TableCell> */}
                                <TableCell className='text-center'>
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.status
                                        )}`}
                                    >
                                        {data.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <UserActionMenu userId={data._id} userRole={"provider"} />
                                </TableCell>
                            </TableRow>
                        }
                    </>
                ))}
            </TableBody>
        </Table>
    )
}

export default DataTable