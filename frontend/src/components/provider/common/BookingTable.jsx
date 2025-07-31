import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getStatusClass } from "@/lib/utils.js"; // adjust path as needed
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// const bodys = [
//   {
//     id: "1",
//     user: "Arun Raj",
//     date: "2025-07-20",
//     service: "AC Repair",
//     status: "confirmed",
//   },
//   {
//     id: "2",
//     user: "Divya Nair",
//     date: "2025-07-19",
//     service: "Plumbing",
//     status: "completed",
//   },
//   {
//     id: "3",
//     user: "Rahul Krishna",
//     date: "2025-07-18",
//     service: "Electrical",
//     status: "cancelled",
//   },
//   {
//     id: "4",
//     user: "Sneha Pillai",
//     date: "2025-07-17",
//     service: "Home Cleaning",
//     status: "confirmed",
//   },
//   {
//     id: "5",
//     user: "Vishnu Das",
//     date: "2025-07-16",
//     service: "CCTV Installation",
//     status: "pending",
//   },
// ];


export function BookingTable({ headData, bodyData, formMode }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headData?.map(data => (
            <TableHead className='last:text-center '>{data}</TableHead>
          ))}
          {/* <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodyData?.map((body) => (
          <TableRow>
            <TableCell>{body.bookingId}</TableCell>
            <TableCell>{body.serviceTitle}</TableCell>
            <TableCell>{body.customer}</TableCell>
            <TableCell>{body.date}</TableCell>
            <TableCell>{body.amount}</TableCell>
            <TableCell className='text-center'>
              <Badge
                className={`px-2 ${getStatusClass(
                  body.status
                )}`}
              >
                {body.status}
              </Badge>
            </TableCell>
            {formMode === "booking"
              && <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className=''>
                    <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className='rounded-2xl'>View</DropdownMenuItem>
                    <DropdownMenuItem className='rounded-2xl'>Cancel</DropdownMenuItem>
                    {/* <DropdownMenuItem className="text-red-600 rounded-2xl">Delete</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
