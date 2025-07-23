// SummarySection.jsx
import {
  BadgeCheck,
  CircleDollarSign,
  ClipboardList,
  Hourglass,
  Star,
  Wrench
} from "lucide-react"
import { useSelector } from "react-redux";

export default function SummarySection({ page }) {
  const { services } = useSelector(state => state.serviceSlice);

  const avgRating = services.reduce((prev, current) => prev + current.avgRating , 0)/services.length
  console.log(avgRating)

  // const totalBookings = services.reduce(())

  const summaryItems = [
    {
      title: "Total Bookings",
      value: "N/A",
      icon: <ClipboardList className="text-primary size-6" />,
    },
    {
      title: "Total Services",
      value: `${services.length}`,
      icon: <Wrench className="text-primary size-6" />,
    },
    {
      title: "Earnings",
      value: "N/A",
      icon: <CircleDollarSign className="text-primary size-6" />,
    },
    {
      title: "Avg. Rating",
      value: `${avgRating > 0 ? avgRating : "N/A"}`,
      icon: <Star className="text-primary size-6" />,
    },
    ...(page === "services" 
      ? []
      : [{
        title: "Ongoing Bookings",
        value: "8",
        icon: <Hourglass className="text-primary size-6" />,
      },
      {
        title: "Completed Bookings",
        value: "100",
        icon: <BadgeCheck className="text-primary size-6" />,
      },])
  ];
  return (
    <div className={`grid ${page === "services" ? "grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"} gap-3`}>
      {summaryItems.map((item, index) => (
        <div className="flex items-center gap-4 border rounded-3xl py-3 px-6">
          <div className="rounded-full">{item.icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <p className="text-xl font-semibold text-primary">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
