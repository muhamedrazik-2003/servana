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
import { Link } from "react-router-dom";



function SampleTable({ headData, bodyData, formMode }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headData?.map(data => (
            <TableHead className='last:text-center '>{data}</TableHead>
          ))}
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SampleTable;