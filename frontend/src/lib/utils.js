import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStatusClass(status) {
  const s = status.toLowerCase()
  switch (s) {
    case "completed":
      return "bg-green-100 text-green-700 border border-green-300"
    case "pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300"
    case "cancelled":
      return "bg-red-100 text-red-700 border border-red-300"
    case "failed":
      return "bg-orange-100 text-orange-700 border border-orange-300"
    case "ongoing":
      return "bg-indigo-100 text-indigo-700 border border-indigo-300"
    case "confirmed":
      return "bg-teal-100 text-teal-700 border border-teal-300"
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200"
  }
}
