import React, { useState } from 'react'
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch } from 'react-redux'
import { addNewReview } from '../../redux/slices/reviewSlice'

function ReviewDialog() {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState("")
    const [newReview,setReview] = useState({
        //  serviceId, providerId, bookingId, rating, comment
    })
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const response = dispatch(addNewReview(newReview))

        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An unexpected error occurred");
        }
        console.log({ rating, comment })
        setOpen(false)
        // Reset form
        setHoverRating(0)
        setRating(0)
        setComment("")
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-8">
                    Write a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>Share your experience and help others make informed decisions.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="rating" className="text-sm font-medium">
                            Rating
                        </Label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="p-1 rounded-sm hover:bg-gray-100 transition-colors"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <Star
                                        className={`h-6 w-6 transition-colors ${hoverRating >= star || rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                </button>
                            ))}
                            {rating > 0 && <span className="ml-2 text-sm text-gray-600">{rating} out of 5 stars</span>}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="comment" className="text-sm font-medium">
                            Your Review
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder="Tell us about your experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[120px] resize-none"
                            maxLength={500}
                        />
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Share your honest thoughts and experiences</span>
                            <span>{comment.length}/500</span>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setHoverRating(0)
                                setRating(0)
                                setComment("")
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={rating === 0 || comment.trim().length === 0} className="min-w-[100px]">
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewDialog