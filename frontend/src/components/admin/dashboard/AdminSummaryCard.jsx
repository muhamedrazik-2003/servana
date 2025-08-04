import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    UserCheck,
    FolderKanban,
    Star,
    CalendarDays,
    Handshake,
    Briefcase,
    Layers3,
    ThumbsUp,
    BarChart3,
} from "lucide-react";

function AdminSummaryCard() {
    const summaryData = [
        {
            title: "Total Bookings",
            value: `100`,
            icon: Handshake, // 🤝 Booking representation
            iconColor: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Total Services",
            value: `₹3454`,
            icon: Briefcase, // 🧰 Services offered
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Active Customers",
            value: `45`,
            icon: Users, // 👥 Users/customers
            iconColor: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Active Providers",
            value: `567`,
            icon: UserCheck, // 👤 Checked user = active provider
            iconColor: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            title: "Total Categories",
            value: `45`,
            icon: Layers3, // 🗂 Category-like stack
            iconColor: "text-indigo-600",
            bgColor: "bg-indigo-50",
        },
        {
            title: "Total Reviews",
            value: `567`,
            icon: Star, // ⭐ Review/star icon
            iconColor: "text-yellow-500",
            bgColor: "bg-yellow-50",
        },
    ];

    return (
        <div className='grid grid-cols-2 row-span-2 gap-2'>
            {
                summaryData.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                        <Card
                            key={index}
                            className="relative overflow-hidden border shadow-sm bg-linear-to-br from-orange-50 via-violet-100 to-teal-100 hover:shadow-xl transition-shadow duration-300 gap-0 py-2 pb-4"
                        >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                                <CardTitle className="text-sm font-medium text-primary">{item.title}</CardTitle>
                                <div className={`p-2 rounded-full ${item.bgColor}`}>
                                    <IconComponent className={`h-5 w-5 ${item.iconColor}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default AdminSummaryCard