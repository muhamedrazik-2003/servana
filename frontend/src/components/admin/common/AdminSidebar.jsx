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
  MessageCircle,
} from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="lg:h-[calc(100vh-82px)] scrollbar-none overflow-x-auto fixed bottom-0 lg:bottom-unset left-0 z-20 lg:left-unset lg:sticky lg:top-[66px] w-full  lg:w-[220px] lg:rounded-3xl bg-linear-to-br from-primary to-violet-900 flex lg:flex-col items-center lg:items-stretch md:justify-center lg:justify-between py-0 lg:py-3 pl-2 md:pl-0">
      {/* Navigation */}
      <nav className="lg:px-2 flex lg:block gap-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <LayoutDashboard className="size-5 text-accent" />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/seekers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <UserRoundSearch className="size-5 text-accent" />
          <span className="hidden md:block">Customers</span>
        </NavLink>
        <NavLink
          to="/admin/providers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <UserRoundCog className="size-5 text-accent" />
          <span className="hidden md:block">Providers</span>
        </NavLink>
        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <Hammer className="size-5 text-accent" />
          <span className="hidden md:block">Services</span>
        </NavLink>
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <CalendarCheck className="size-5 text-accent" />
          <span className="hidden md:block">Bookings</span>
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <Columns3Cog className="size-5 text-accent" />
          <span className="hidden md:block">Categories</span>
        </NavLink>
        <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <MessageCircle className="size-5 text-accent" />
          <span className="hidden md:block">Service Reviews</span>
        </NavLink>
        <NavLink
          to="/admin/feedbacks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <Star className="size-5 text-accent" />
          <span className="hidden md:block">User Feedbacks</span>
        </NavLink>
      </nav>

      {/* Profile & Logout */}
      <div className="px-2 pb-4 mt-4 flex items-center lg:block gap-1">
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 md:px-4 py-3 lg:py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <User className="size-5 text-accent" />
          <span className="hidden md:block">Profile</span>
        </NavLink>

        <Link to='/'>
          <button className="w-full text-left flex items-center gap-3 px-3 md:px-4 py-2 rounded-3xl text-red-100 bg-red-500 hover:bg-red-700 transition">
            <LogOut className="size-5 text-white" />
            <span className="hidden md:block">Logout</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
