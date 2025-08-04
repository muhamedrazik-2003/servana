import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux';
import { getStatusClass } from '../../../lib/utils';
import UserActionMenu from './UserActionMenu';
import { getAllServices } from '../../../redux/slices/serviceSlice';
import { getAllBookings } from '../../../redux/slices/bookingSlice';
import ServiceActionMenu from '../ServiceActionMenu';

const DataTable = ({ headData, rowData, tableFormat }) => {
    const { bookings } = useSelector(state => state.bookingSlice);
    const { services } = useSelector(state => state.serviceSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (bookings.length === 0) {
            dispatch(getAllBookings());
        }
        if (services.length === 0) {
            dispatch(getAllServices());
        }
    }, [])
    // console.log(services)
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
                                <TableCell>{data.phone || "Not Available"}</TableCell>
                                <TableCell>
                                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </TableCell>
                                <TableCell className='text-center pr-6'>{handleSeekerTotalBooking(data._id)}</TableCell>
                                <TableCell >
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.isVerified ? "verified" : "Not Verified"
                                        )}`}
                                    >
                                        {data.isVerified ? "verified" : "Not Verified"}
                                    </Badge>
                                </TableCell>
                                {/* <TableCell>{data?.location.city + ", " + data?.location.state + ", " + data?.location.pincode}</TableCell> */}
                                <TableCell>
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.status
                                        )}`}
                                    >
                                        {data.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <UserActionMenu userId={data._id} userRole={tableFormat} />
                                </TableCell>
                            </TableRow>
                        }
                        {tableFormat === "provider"
                            && // seeker row
                            <TableRow>
                                <TableCell>{data.fullName}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone || "Not Available"}</TableCell>
                                <TableCell>
                                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </TableCell>
                                <TableCell className='text-center pr-6'>{handleProviderTotalServices(data._id)}</TableCell>
                                <TableCell >
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.isVerified ? "verified" : "Not Verified"
                                        )}`}
                                    >
                                        {data.isVerified ? "verified" : "Not Verified"}
                                    </Badge>
                                </TableCell>
                                {/* <TableCell>{data?.location.city + ", " + data?.location.state + ", " + data?.location.pincode}</TableCell> */}
                                <TableCell>
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.status
                                        )}`}
                                    >
                                        {data.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <UserActionMenu userId={data._id} userRole={tableFormat} />
                                </TableCell>
                            </TableRow>
                        }
                        {tableFormat === "service"
                            && // seeker row
                            <TableRow>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.category}</TableCell>
                                <TableCell>{data.subCategory}</TableCell>
                                <TableCell>{data.providerId.fullName}</TableCell>
                                
                                <TableCell >{data?.location.city + ", " + data?.location.state}</TableCell>
                                {/* <TableCell>{data?.location.city + ", " + data?.location.state + ", " + data?.location.pincode}</TableCell> */}
                                <TableCell className='text-center'>{data.price}</TableCell>
                                <TableCell>
                                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        className={`px-2 ${getStatusClass(
                                            data.status
                                        )}`}
                                    >
                                        {data.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <ServiceActionMenu serviceId={data._id}/>
                                    {/* <UserActionMenu userId={data._id} userRole={tableFormat} /> */}
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