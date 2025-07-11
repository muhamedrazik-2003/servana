import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

function BookingCard({ serviceName, providerName, date, time, location, status }) {
    function getStatusColor(status) {
        const statusData = status.toLowerCase()
        switch (statusData) {
            case "confirmed": return "bg-green-500 text-white border-green-500";
            case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "cancelled": return "bg-red-100 text-red-700 border-red-200";
            case "completed": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "";
        }
    }
    return (
        <Card className="rounded-3xl shadow-sm border bg-linear-to-br from-teal-100 to-violet-100  hover:shadow-lg transition-all pt-2 pb-1">
            <CardContent className="py-4  px-5 space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">Ac Repair</h3>
                    <Badge variant="outline" className={getStatusColor("confirmed")}>Confirmed</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <span>12 June 2026</span>
                    <Clock className="w-4 h-4 ml-4 text-primary" />
                    <span>3.35 PM</span>
                </div>
                <p className="text-sm text-muted-foreground">Served by: <span className="font-medium text-gray-700">Askokan k</span></p>


                <div className="flex items-center text-sm text-gray-600 gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Calicut</span>
                </div>

                <div className="pt-2">
                    <Link to={'/seeker/mybookings/booking'}><Button variant="default" size="sm">View Details</Button></Link>
                </div>
            </CardContent>
        </Card>
    )
}
export default BookingCard
