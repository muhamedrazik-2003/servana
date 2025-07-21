import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Settings,
  PlusSquare,
  DollarSign,
  Star,
  LogOut,
  User,
  Hammer,
} from "lucide-react";

function ProviderSidebar() {
  return (
    <aside className="h-[calc(100vh-82px)] sticky top-[66px] w-[220px] rounded-3xl bg-orange-100 flex flex-col justify-between py-3">
      {/* Navigation */}
      <nav className="space-y-1 px-2">
        <NavLink
          to="/provider/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <LayoutDashboard className="size-5 text-primary" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/provider/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <CalendarCheck className="size-5 text-primary" />
          <span>Bookings</span>
        </NavLink>

        <NavLink
          to="/provider/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Hammer className="size-5 text-primary" />
          <span>Services</span>
        </NavLink>

        <NavLink
          to="/provider/services/new"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <PlusSquare className="size-5 text-primary" />
          <span>Add New</span>
        </NavLink>

        <NavLink
          to="/provider/earnings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <DollarSign className="size-5 text-primary" />
          <span>Earnings</span>
        </NavLink>

        <NavLink
          to="/provider/reviews"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Star className="size-5 text-primary" />
          <span>Reviews</span>
        </NavLink>
      </nav>

      {/* Profile & Logout */}
      <div className="px-2 pb-4 space-y-1 mt-4">
        <NavLink
          to="/provider/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <User className="size-5 text-primary" />
          <span>Profile</span>
        </NavLink>

        <button className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-3xl text-red-500 hover:bg-orange-200 transition">
          <LogOut className="size-5 text-primary" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default ProviderSidebar;
