import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useSelector } from "react-redux";

function CustomerProviderChart() {

  const {seekers, providers} = useSelector(state => state.userSlice);


  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentSeekers = seekers.filter(seeker => {
    const createdAt = new Date(seeker.createdAt);
    return createdAt >= sixMonthsAgo;
  });
  const recentProviders = providers.filter(provider => {
    const createdAt = new Date(provider.createdAt);
    return createdAt >= sixMonthsAgo;
  });


  const chartData = [
    { category: "bookings", total: recentSeekers.length, fill: "var(--color-bookings)" },
    { category: "services", total: recentProviders.length, fill: "var(--color-services)" },
  ]

  const chartConfig = {
    total: {
      label: "Total",
    },

    bookings: {
      label: "Cutomers",
      color: "var(--chart-3)",
    },

    services: {
      label: "Providers",
      color: "var(--chart-2)",
    },
  }
  return (
    <Card className='py-2'>
      <CardContent className="pb-0">
        <CardTitle className='text-xs text-primary'>Customers & Providers <br /> (Last 6 Months)</CardTitle>
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

export default CustomerProviderChart