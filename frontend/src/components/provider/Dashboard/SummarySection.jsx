// SummarySection.jsx
import {
  BadgeCheck,
  CircleDollarSign,
  ClipboardList,
  Hourglass,
  Star,
  Wrench
} from "lucide-react"

export default function SummarySection({ page }) {
  const summaryItems = [
    {
      title: "Total Bookings",
      value: "120",
      icon: <ClipboardList className="text-primary size-6" />,
    },
    {
      title: "Total Services",
      value: "18",
      icon: <Wrench className="text-primary size-6" />,
    },
    {
      title: "Earnings",
      value: "₹34,000",
      icon: <CircleDollarSign className="text-primary size-6" />,
    },
    {
      title: "Avg. Rating",
      value: "4.7",
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
