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
    <aside className="h-[calc(100vh-82px)] sticky top-[66px] w-[220px] rounded-[30px] bg-linear-to-br from-primary to-violet-900 flex flex-col justify-between py-3 px-0.5">
      {/* Navigation */}
      <nav className="space-y-1 px-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <LayoutDashboard className="size-5 text-accent" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/seekers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <UserRoundSearch className="size-5 text-accent" />
          <span>Customers</span>
        </NavLink>
        <NavLink
          to="/admin/providers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <UserRoundCog className="size-5 text-accent" />
          <span>Providers</span>
        </NavLink>
        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <Hammer className="size-5 text-accent" />
          <span>Services</span>
        </NavLink>
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <CalendarCheck className="size-5 text-accent" />
          <span>Bookings</span>
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <Columns3Cog className="size-5 text-accent" />
          <span>Categories</span>
        </NavLink>
        <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <MessageCircle className="size-5 text-accent" />
          <span>Service Reviews</span>
        </NavLink>
        {/* <NavLink
          to="/admin/feedbacks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <Star className="size-5 text-accent" />
          <span>User Feedbacks</span>
        </NavLink> */}
      </nav>

      {/* Profile & Logout */}
      <div className="px-2  space-y-1 mt-4">
        <NavLink
          to="/provider/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-3xl transition hover:bg-background hover:text-foreground 
            ${isActive ? "bg-background text-foreground font-medium" : "text-background"}`
          }
        >
          <User className="size-5 text-accent" />
          <span>Profile</span>
        </NavLink>

        <Link to='/'>
          <button className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-3xl text-red-100 bg-red-500 hover:bg-red-700 transition">
            <LogOut className="size-5 text-accent" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
