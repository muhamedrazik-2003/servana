import { Star } from "lucide-react";

export default function MiniReviewCard({reviewData}) {
    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm w-full space-y-2">
            <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-800">{reviewData?.seekerId?.fullName}</div>
                <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < reviewData.rating ? "fill-yellow-400" : "text-gray-300"}`}
                        />
                    ))}
                </div>
            </div>


            {/* Review Text */}
            <p className="text-sm text-gray-600 italic line-clamp-3">
                “{reviewData.comment}”
            </p>
        </div>
    );
}
