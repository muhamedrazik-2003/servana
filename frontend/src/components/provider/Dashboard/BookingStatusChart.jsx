// src/components/BookingStatusChart.jsx

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const data = [
  { date: "Jul 1", ongoing: 2, completed: 4, cancelled: 1 },
  { date: "Jul 2", ongoing: 3, completed: 5, cancelled: 2 },
  { date: "Jul 3", ongoing: 1, completed: 6, cancelled: 0 },
  { date: "Jul 4", ongoing: 2, completed: 3, cancelled: 3 },
];

export default function BookingStatusChart() {
  return (
    <Card className="w-full pb-1 pt-3 gap-2">
      <CardHeader>
        <CardTitle className='text-sm mx-0'>Booking Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -40, bottom: 0 }}>
            <defs>
              <linearGradient id="ongoing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cancelled" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis className="text-xs" dataKey="date" />
            <YAxis className="text-xs"/>
            <Tooltip />

            <Area
              type="monotone"
              dataKey="ongoing"
              stroke="#22d3ee"
              fillOpacity={1}
              fill="url(#ongoing)"
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#34d399"
              fillOpacity={1}
              fill="url(#completed)"
            />
            <Area
              type="monotone"
              dataKey="cancelled"
              stroke="#f87171"
              fillOpacity={1}
              fill="url(#cancelled)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
