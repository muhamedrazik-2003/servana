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
import { useSelector } from "react-redux";
import { useState } from "react";

export default function BookingStatusChart() {
  const bookingChartData = []
  const { bookings } = useSelector(state => state.bookingSlice);
  const BookingsInLastWeek = [...bookings].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  for (let booking of BookingsInLastWeek) {

    const bookingDate = new Date(booking?.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let existingData = bookingChartData.find(booking => booking.date === bookingDate)
    if (!existingData) {
      existingData = { date: bookingDate, ongoing: 0, completed: 0, cancelled: 0 }
      bookingChartData.push(existingData);
    }

    if (booking.bookingStatus === "ongoing") {
      existingData.ongoing += 1
    } else if (booking.bookingStatus === "completed") {
      existingData.completed += 1
    } else if (booking.bookingStatus === "failed") {
      existingData.failed += 1
    }
  }

  return (
    <Card className="w-full pb-1 pt-3 gap-0">
      <CardHeader>
        <CardTitle className='text-sm mx-0 text-accent'>Booking Overview for last 7 Days</CardTitle>
      </CardHeader>
      <CardContent className="h-[140px] px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={bookingChartData} margin={{ top: 10, right: 0, left: -40, bottom: 0 }}>
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
            <YAxis className="text-xs" />
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
