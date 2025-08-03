import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A radar chart showing customers and providers per month"

const chartData = [
  { month: "January", customers: 245, providers: 32 },
  { month: "February", customers: 289, providers: 41 },
  { month: "March", customers: 324, providers: 38 },
  { month: "April", customers: 378, providers: 45 },
  { month: "May", customers: 412, providers: 52 },
  { month: "June", customers: 456, providers: 58 },
]

const chartConfig = {
  customers: {
    label: "Customers",
    color: "var(--chart-3)",
  },

  providers: {
    label: "Providers",
    color: "var(--chart-2)",
  }
}

export function CustomerProviderRadarChart() {
  return (
    <Card className='py-2'>
      <CardContent className="pb-0">
        <CardTitle className='text-xs text-primary'>Customer & Provider Growth Monthly</CardTitle>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="customers"
              fill="var(--color-customers)"
              fillOpacity={0.6}
              stroke="var(--color-customers)"
              strokeWidth={2} />
            <Radar
              dataKey="providers"
              fill="var(--color-providers)"
              fillOpacity={0.4}
              stroke="var(--color-providers)"
              strokeWidth={2} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
