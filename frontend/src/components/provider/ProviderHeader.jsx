import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Bell, Moon, User, Search, Calendar, Sun, MapPin, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/assets/images/logo.png"

function ProviderHeader() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <header className="w-full sticky top-0 z-50 bg-background dark:bg-background transition-all">
            <div className="mx-4 lg:mx-10 py-3 flex items-center justify-between">
                {/* Logo + Name */}
                <Link to="/seeker/home" className="flex items-center gap-2">
                    <img src={Logo} alt="Servana Logo" className="h-8 w-8" />
                    <span className="font-bold text-xl md:hidden lg:block text-gray-800 dark:text-white">Servana</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-2">

                        <div className="relative md:w-[200px] lg:w-[360px]">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                className="pl-10 pr-3 py-2 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 text-sm outline-none"
                            />
                        </div>
                    </div>

                    {/* Notification (disabled) */}
                    <button disabled className="text-gray-400 cursor-not-allowed">
                        <Bell className="h-5 w-5" />
                    </button>

                    {/* Dark Mode Toggle (disabled) */}
                    <button disabled className="text-gray-400 cursor-not-allowed">
                        <Sun className="h-5 w-5" />
                    </button>

                    {/* <div className="relative group py-2">
            <button className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="text-sm hidden lg:inline">Profile</span>
            </button>
      
            <div className="absolute right-0 top-full pt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-3xl hidden group-hover:block p-2">
              <Link to="/seeker/profile" className="block px-3 py-2 text-sm rounded-3xl hover:bg-teal-100 dark:hover:bg-gray-700">View Profile</Link>
              <Link to="/" className="block px-3 py-2 text-sm rounded-3xl hover:bg-red-500 hover:text-background dark:hover:bg-red-600">Logout</Link>
            </div>
          </div> */}
                </div>

                {/* Mobile menu icon */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile dropdown (optional) */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2.5">
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-10 pr-3 py-2 rounded-3xl border-2 bg-teal-50 dark:bg-gray-800 text-sm outline-none"
                    />
                    {/* <Link to="/services" className="block text-sm">All Services</Link>
          <Link to="/seeker/mybookings" className="block text-sm">Your Bookings</Link>*/}
                    <button disabled className="text-sm text-gray-400 cursor-not-allowed">Notifications (Coming Soon)</button>
                    <button disabled className="text-sm text-gray-400 cursor-not-allowed">Dark Mode</button>
                    {/* <Link to="/profile" className="block text-sm">View Profile</Link>
          <button className="block text-sm text-red-500">Logout</button> */}
                </div>
            )}
        </header>
    )
}

export default ProviderHeader