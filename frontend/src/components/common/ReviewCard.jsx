import { Star, MapPin, Calendar, Hash } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function ReviewCard({ review }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
        ))
    }
    return (
        <Card className={"w-full max-w-2xl py-0"}>
            <CardContent className="p-5 flex flex-col justify-between h-full">
                {/* Header with customer info and rating */}
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Avatar className="size-8">
                                    <AvatarImage src={`${review.seekerId?.profilePicture}`} />
                                    <AvatarFallback>NA</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {review.seekerId?.fullName}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Badge className="ml-4 bg-accent text-black">
                            {review.serviceId?.title}
                        </Badge>
                    </div>

                    {/* Review comment */}
                    <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
                    </div>
                </div>
                {/* Footer with metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 ">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                            {review?.location?.city === "Not Available"
                                ? "Not Available"
                                : `${review.seekerId?.location?.city}, ${review.seekerId?.location?.state}`}
                        </span>

                    </div>
                    <Link to={`/provider/services/${review?.serviceId?._id}`}>
                        <div className="flex items-center gap-1">
                            <Hash className="h-4 w-4 text-accent" />
                            <span className="font-mono text-xs text-accent">{review.serviceId?._id}</span>
                        </div>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
