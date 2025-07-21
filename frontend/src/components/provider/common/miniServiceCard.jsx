import { Eye, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStatusClass } from "../../../lib/utils";


export default function MiniServiceCard() {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <h4 className="text-lg font-semibold text-gray-800">serviceName</h4>
        <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${getStatusClass("completed")}`}>
          <BadgeCheck className="w-3.5 h-3.5" />
          completed
        </span>
      </div>

      {/* Booking Count */}
      <div className="text-sm text-gray-600">
        Bookings: <span className="font-medium text-gray-900">80</span>
      </div>

      {/* View Button */}
      <Button
        variant="outline2"
        className="w-full gap-2 hover:bg-accent hover:border-accent"
        // onClick=
      >
        <Eye className="w-4 h-4" />
        View Details
      </Button>
    </div>
  );
}
