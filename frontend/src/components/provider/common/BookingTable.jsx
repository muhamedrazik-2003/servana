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
import {Badge} from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const bookings = [
  {
    id: "1",
    user: "John Doe",
    date: "2025-07-20",
    service: "AC Repair",
    status: "confirmed",
  },
  {
    id: "2",
    user: "Jane Smith",
    date: "2025-07-19",
    service: "Plumbing",
    status: "completed",
  },
  {
    id: "3",
    user: "Mark J.",
    date: "2025-07-18",
    service: "Electrical",
    status: "cancelled",
  }
];

export function BookingTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.user}</TableCell>
            <TableCell>{booking.service}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>
              <Badge
                className={`px-2 ${getStatusClass(
                  booking.status
                )}`}
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
