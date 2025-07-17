import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, User, Hash, CreditCard, X, ToolCase, Clock } from "lucide-react"
import { Badge } from '@/components/ui/badge'


function BookingCard({ cardVarient = "home" }) {

    const bookingCardData = {
        bookingId: "BK-20250717-0012",
        providerName: "Anjali Ramesh",
        scheduleDate: "2025-07-20", // YYYY-MM-DD
        scheduleTime: "16:30", // HH:mm (24-hour format)
        instructions: "Please carry your own tools. Gate code is 4729.",
        status: "completed", // can be: pending, confirmed, completed, cancelled, failed
        paymentStatus: "paid", // can be: paid, unpaid, refunded
        paymentAmount: 1200, // in INR or your currency
        cancelReason: null, // or e.g., "Client unavailable"
        failureReason: null // or e.g., "Payment failed due to timeout"
    };

    function getStatusColor(status) {
        const s = status.toLowerCase()
        switch (s) {
            case "completed": return "bg-green-400 text-green-50 border-green-600";
            case "pending": return "bg-yellow-400 text-yellow-950 border-yellow-700";
            case "cancelled": return "bg-red-600 text-red-50 border-red-700";
            case "failed": return "bg-orange-400 text-orange-950 border-orange-700";
            case "ongoing": return "bg-indigo-400 text-indigo-50 border-indigo-700";
            case "confirmed": return "bg-teal-300 text-teal-950 border-teal-700";
            case "paid": return "bg-green-200 text-green-950 border-green-300";
            default: return "bg-muted text-muted-foreground";
        }
    }

    function getActionButton(status) {
        const s = status.toLowerCase()
        switch (s) {
            case "confirmed":
                return (
                    <div className="flex gap-2">
                        <Button variant="destructive" size="sm">Cancel</Button>
                        <Button variant="outline2" size="sm">Reschedule</Button>
                    </div>
                )
            case "ongoing":
                return <Button variant="default" size="sm">Contact Provider</Button>
            case "completed":
                return(
                    <div className="flex gap-2">
                        <Button variant="outline2" size="sm">Rate Now</Button>
                        <Button variant="outline2" size="sm">Book Again</Button>
                    </div>
                )
            case "cancelled":
            case "failed":
                return <Button variant="outline2" size="sm">Book Again</Button>
            default:
                return null;
        }
    }

    return (
        <>
            <Card className="w-full max-w-md mx-auto bg-gray-50 border-2 border-gray-300 rounded-3xl gap-0">
                <CardHeader className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ToolCase className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-900">AC Repair</span>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(bookingCardData.status)} font-semibold `}>{bookingCardData.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-red-500" />
                            <span className="text-gray-900 font-medium">Jul 18, 2025</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-red-500" />
                            <span className="text-gray-900 font-medium">3:00 PM</span>

                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-900 font-medium">John Electricians</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="text-gray-700">Calicut, Kerala</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Hash className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-900 font-medium">Booking ID: #SRV45322</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-yellow-600" />
                            <span className="text-gray-900 font-medium">₹499</span>
                        </div>
                        <span className="text-green-500">Paid</span>
                    </div>
                    <Separator className="my-4" />
                </CardContent>
                
                <CardFooter className="flex gap-2 pt-2 justify-end pr-4">

                   {getActionButton(bookingCardData.status)}
                    <Button variant="" size='sm' >
                        View Details
                    </Button>
                </CardFooter>

            </Card>
        </>
    )
}

export default BookingCard
