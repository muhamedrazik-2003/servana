import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A donut chart with an active sector showing business metrics"

const chartData = [
  { category: "bookings", total: 485, fill: "var(--color-bookings)" },
  { category: "services", total: 320, fill: "var(--color-services)" },
  { category: "reviews", total: 275, fill: "var(--color-reviews)" },
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

export function BusinessMetricsDonutChart() {
  return (
    <Card className='py-2'>
      <CardContent className="pb-0">
        <CardTitle className='text-xs text-primary'>Bookings, Services & Reviews <br/> (Last 6 Months)</CardTitle>
        <ChartContainer config={chartConfig}className="mx-auto aspect-square max-h-[300px]">
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
