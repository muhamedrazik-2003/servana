import { Eye, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStatusClass } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Link } from "react-router-dom";


export default function MiniServiceCard({ data }) {
  return (
    <div className="border rounded-xl !w-[300px] shrink-0 p-4 bg-white shadow-sm space-y-2">
      {/* Header */}
      <h4 className="text-sm font-semibold text-gray-800">{data.title}</h4>
      <div className="text-right">
        <Badge className={`${getStatusClass(data.status)} h-6`}>{data.status}</Badge>
      </div>

      {/* Booking Count */}
      <div className="text-sm text-gray-600">
        Bookings: <span className="font-medium text-gray-900">{data.totalBookings}</span>
      </div>

      {/* View Button */}
      <Link to={`/provider/services/${data._id}`}>
      <Button
        variant="outline2"
        className="w-full gap-2 hover:bg-accent hover:border-accent"
      // onClick=
      >
        <Eye className="w-4 h-4" />
        View Details
      </Button>
      </Link>
    </div>
  );
}
