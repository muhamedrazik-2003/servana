import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useSelector } from "react-redux";

function BookingServicesReviewsChart() {

  const {bookings} = useSelector(state => state.bookingSlice);
  const {services} = useSelector(state => state.serviceSlice);
  const {reviews} = useSelector(state => state.reviewSlice);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentBookings = bookings.filter(booking => {
    const createdAt = new Date(booking.createdAt);
    return createdAt >= sixMonthsAgo;
  });
  const recentServices = services.filter(service => {
    const createdAt = new Date(service.createdAt);
    return createdAt >= sixMonthsAgo;
  });
  const recentReviews = reviews.filter(review => {
    const createdAt = new Date(review.createdAt);
    return createdAt >= sixMonthsAgo;
  });

  const chartData = [
    { category: "bookings", total: recentBookings.length, fill: "var(--color-bookings)" },
    { category: "services", total: recentServices.length, fill: "var(--color-services)" },
    { category: "reviews", total: recentReviews.length, fill: "var(--color-reviews)" },
  ]

  const chartConfig = {
    total: {
      label: "Total",
    },

    bookings: {
      label: "Bookings",
      color: "var(--chart-1)",
    },

    services: {
      label: "Services",
      color: "var(--chart-2)",
    },

    reviews: {
      label: "Reviews",
      color: "var(--chart-3)",
    }
  }
  return (
    <Card className='py-2'>
      <CardContent className="pb-0">
        <CardTitle className='text-xs text-primary'>Bookings, Services & Reviews <br /> (Last 6 Months)</CardTitle>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default BookingServicesReviewsChart