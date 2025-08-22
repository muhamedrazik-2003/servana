import { Link, NavLink } from "react-router-dom";
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
    <aside className="lg:h-[calc(100vh-82px)] fixed bottom-0 lg:bottom-unset left-0 z-10 lg:left-unset lg:sticky lg:top-[66px] w-full  lg:w-[220px] lg:rounded-3xl bg-orange-100 flex lg:flex-col items-center lg:items-stretch justify-center lg:justify-between py-0 lg:py-3">
      {/* Navigation */}
      <nav className="lg:px-2 flex lg:block gap-1">
        <NavLink
          to="/provider/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <LayoutDashboard className="size-5 text-primary" />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>

        <NavLink
          to="/provider/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <CalendarCheck className="size-5 text-primary" />
          <span className="hidden md:block">Bookings</span>
        </NavLink>

        <NavLink
          to="/provider/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Hammer className="size-5 text-primary" />
          <span className="hidden md:block">Services</span>
        </NavLink>

        <NavLink
          to="/provider/services/new"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <PlusSquare className="size-5 text-primary" />
          <span className="hidden md:block">Add New</span>
        </NavLink>

        <NavLink
          to="/provider/earnings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <DollarSign className="size-5 text-primary" />
          <span className="hidden md:block">Earnings</span>
        </NavLink>

        <NavLink
          to="/provider/reviews"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Star className="size-5 text-primary" />
          <span className="hidden md:block">Reviews</span>
        </NavLink>
      </nav>

      {/* Profile & Logout */}
      <div className="px-2 pb-4 mt-4 flex items-center lg:block gap-1">
        <NavLink
          to="/provider/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <User className="size-5 text-primary" />
          <span className="hidden md:block">Profile</span>
        </NavLink>

        <Link to='/'>
          <button className="w-full text-left flex items-center gap-3 px-3 md:px-4 py-2 rounded-3xl text-red-500 hover:bg-orange-200 transition">
            <LogOut className="size-5 text-red-500" />
            <span className="hidden md:block">Logout</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default ProviderSidebar;
