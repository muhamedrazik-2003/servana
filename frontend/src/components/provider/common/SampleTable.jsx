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
            <TableHead className='last:text-center font-bold'>{data}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodyData?.map((body) => (
          formMode === "services"
            ? <>
              <TableRow>
                <TableCell>{body.title}</TableCell>
                <TableCell>{body.category}</TableCell>
                <TableCell>{body.providerId.fullName}</TableCell>
                <TableCell>{body?.location.city + ", " + body?.location.state}</TableCell>
                <TableCell>{body.price}</TableCell>
                <TableCell className='text-center'>
                  <Badge
                    className={`px-2 ${getStatusClass(
                      body.status
                    )}`}
                  >
                    {body.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(body.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </TableCell>
                <Link to={`/admin/services/${body._id}`}>
                  <TableCell className='text-accent'>View Details</TableCell>
                </Link>
              </TableRow>
            </>

            : <>
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
            </>
        ))}
      </TableBody>
    </Table>
  );
}

export default SampleTable;