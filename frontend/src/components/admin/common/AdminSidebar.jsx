import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Star,
  LogOut,
  User,
  Hammer,
  UserRoundSearch,
  UserRoundCog,
  Columns3Cog,
} from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="h-[calc(100vh-82px)] sticky top-[66px] w-[220px] rounded-3xl bg-orange-100 flex flex-col justify-between py-3">
      {/* Navigation */}
      <nav className="space-y-1 px-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <LayoutDashboard className="size-5 text-primary" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/seekers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <UserRoundSearch className="size-5 text-primary" />
          <span>Customers</span>
        </NavLink>
        <NavLink
          to="/admin/providers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <UserRoundCog className="size-5 text-primary" />
          <span>Providers</span>
        </NavLink>
        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Hammer className="size-5 text-primary" />
          <span>Services</span>
        </NavLink>
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <CalendarCheck className="size-5 text-primary" />
          <span>Bookings</span>
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Columns3Cog className="size-5 text-primary" />
          <span>Categories</span>
        </NavLink>
        <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Star className="size-5 text-primary" />
          <span>Service Reviews</span>
        </NavLink>
        <NavLink
          to="/admin/feedbacks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-orange-200 
            ${isActive ? "bg-accent text-white font-medium" : "text-gray-800"}`
          }
        >
          <Star className="size-5 text-primary" />
          <span>User Feedbacks</span>
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

        <Link to='/'>
          <button className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-3xl text-red-500 hover:bg-orange-200 transition">
            <LogOut className="size-5 text-primary" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
