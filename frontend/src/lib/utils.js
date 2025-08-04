import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStatusClass(status) {
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
    case "verified":
      return "bg-emerald-100 text-emerald-700 border border-emerald-300 w-22";
    case "not verified":
      return "bg-yellow-100 text-gray-700 border border-yellow-200 w-22";
    case "banned":
      return "bg-rose-100 text-rose-700 border border-rose-300 w-22";
    case "active":
      return "bg-secondary text-black w-22";
    case "inactive":
      return "bg-red-500 text-white w-22";
    case "flagged":
      return "bg-black text-white w-22";

    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
}

export function optimizeImage (url)  {
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
};
