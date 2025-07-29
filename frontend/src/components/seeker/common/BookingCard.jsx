import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, User, Hash, CreditCard, X, ToolCase, Clock, PhoneCall } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Link } from "react-router-dom"
// import { useSelector } from "react-redux"


function BookingCard({ userRole, bookingCardData }) {



    function getStatusColor(status) {
        const s = status?.toLowerCase();
        switch (s) {
            case "completed":
                return "bg-green-100 text-green-700 border border-green-300";
            case "pending":
                return "bg-yellow-100 text-yellow-700 border border-yellow-300";
            case "cancelled":
                return "bg-red-100 text-red-700 border border-red-300";
            case "failed":
                return "bg-orange-100 text-orange-700 border border-orange-300";
            case "ongoing":
                return "bg-indigo-100 text-indigo-700 border border-indigo-300";
            case "confirmed":
                return "bg-teal-100 text-teal-700 border border-teal-300";
            default:
                return "bg-gray-100 text-gray-700 border border-gray-200";
        }
    }


    function SeekerGetActionButton(status) {
        const s = status?.toLowerCase()
        switch (s) {
            case "confirmed":
                return (
                    <div className="flex gap-2 flex-wrap">
                        <Button variant="destructive" size="sm">Cancel</Button>
                        <Button variant="outline2" size="sm">Reschedule</Button>
                    </div>
                )
            case "ongoing":
                return <Button variant="default" size="sm">Contact Provider</Button>
            case "completed":
                return (
                    <div className="flex gap-2 w-full">
                        <Button variant="outline2" size="sm" className='w-[50%] lg:w-auto'>Rate Now</Button>
                        <Button variant="outline2" size="sm" className='w-[50%] lg:w-auto'>Book Again</Button>
                    </div>
                )
            case "cancelled":
            case "failed":
                return <Button variant="outline2" size="sm">Book Again</Button>
            default:
                return null;
        }
    }
    function ProviderGetActionButton(status) {
        const s = status?.toLowerCase()
        switch (s) {
            case "pending":
                return (
                    <div className="flex gap-1">
                        <Button variant="destructive" size="sm">Reject</Button>
                        <Button variant="outline2" size="sm">Accept</Button>
                    </div>
                )
            case "ongoing":
                return (
                    <div className="flex gap-1">
                        <Button variant="destructive" size="sm" className='w-[50%] px-1'>Cancel</Button>
                        <Button variant="outline2" size="sm" className='w-[50%] hover:bg-accent hover:border-accent px-5'>Completed</Button>
                    </div>
                )
            default:
                return null;
        }
    }

    const getPaymentStatus = (status) => {
        if (status === "pending") {
            return "text-red-500"
        } else if (status === "paid") {
            return "text-green-500"
        } else {
            return "text-gray-700"
        }
    }
    return (
        <>
            <Card className="w-full max-w-md mx-auto bg-gray-50 border-2 border-gray-300 rounded-3xl gap-0 justify-between">
                <div>
                    <CardHeader className="">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ToolCase className="w-5 h-5 text-gray-600" />
                                <span className="font-semibold text-gray-900">{bookingCardData?.serviceId?.title || 'Not Available'}</span>
                            </div>
                            <Badge variant="outline" className={`${getStatusColor(bookingCardData?.bookingStatus)} font-semibold `}>{bookingCardData?.bookingStatus || 'Not Available'}</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-red-500" />
                                <span className="text-gray-900 font-medium">{bookingCardData?.scheduledDate.slice(0, 10) || 'Not Available'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-red-500" />
                                <span className="text-gray-900 font-medium">{bookingCardData?.scheduledTime || 'Not Available'}</span>

                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Separator className="my-4" />


                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-blue-600" />
                            {userRole === "provider"
                                ? <span className="text-gray-900 font-medium">Customer : {bookingCardData?.seekerId?.fullName}</span>
                                : <span className="text-gray-900 font-medium">Provider : {bookingCardData?.providerId?.fullName}</span>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            {userRole === "provider"
                                && <div className="flex items-center gap-3">
                                    <PhoneCall className="w-4 h-4 text-red-500" />
                                    <span className="text-gray-900 font-medium">998432642</span>
                                </div>
                            }
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="text-gray-700">{bookingCardData?.location?.city + ", " + bookingCardData?.location?.state + ", " + bookingCardData?.location?.pincode || 'Not Available'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Hash className="w-5 h-5 text-purple-600" />
                            <span className="text-gray-900 font-medium">{bookingCardData?._id || 'Not Available'}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-yellow-600" />
                                <span className="text-gray-900 font-medium">{bookingCardData?.totalPrice || 0}</span>
                            </div>
                            <span className={getPaymentStatus(bookingCardData?.paymentStatus || "Not Available")}>{bookingCardData?.paymentStatus || 'Not Available'}</span>
                        </div>
                        <Separator className="my-4" />
                        {userRole === "provider"
                            && <div className="text-sm pb-3 flex gap-2">
                                <h5>Note :</h5>
                                <p>{bookingCardData.seekerNotes || 'Not Provided'}</p>
                            </div>
                        }
                    </CardContent>
                </div>
                <CardFooter className={`flex gap-2 pt-2 px-4 justify-end flex-wrap xl:flex-nowrap `}>

                    {userRole === "provider"
                        ? <>{ProviderGetActionButton(bookingCardData?.bookingStatus)}
                            <Link to={`/provider/mybookings/${bookingCardData?._id}`}>
                                <Button variant="" size='sm' className='w-full lg:w-auto px-3' >
                                    View Details
                                </Button>
                            </Link>
                        </>

                        : <>{SeekerGetActionButton(bookingCardData?.bookingStatus)}
                            <Link to={`/seeker/mybookings/${bookingCardData?._id}`}>
                                <Button variant="" size='sm' className='w-full lg:w-auto' >
                                    View Details
                                </Button>
                            </Link>
                        </>
                    }

                </CardFooter>

            </Card>
        </>
    )
}

export default BookingCard
