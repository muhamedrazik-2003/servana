import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Bell, Moon, User, Search, Calendar, Sun, MapPin, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/assets/images/logo.png"
import { useDispatch } from "react-redux"
import { handleSearch } from "../../redux/slices/serviceSlice"
import { handleLogout } from "../../redux/slices/userSlice"

function ProviderHeader({ page, userRole }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <header className="w-full sticky top-0 z-50 bg-background dark:bg-background transition-all">
            <div className="mx-4 lg:mx-10 py-3 flex items-center justify-between">
                {/* Logo + Name */}
                <div className="flex items-center gap-3">
                    <Link to="/provider/dashboard" className="flex items-center gap-2">
                        <img src={Logo} alt="Servana Logo" className="h-8 w-8" />
                        <span className="font-bold text-xl md:hidden lg:block text-gray-800 dark:text-white">Servana</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-2">

                        {page === "dashboard"
                            ? <div className="relative md:w-[200px] lg:w-[360px]">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                                <input
                                    type="text"
                                    onChange={(e) => dispatch(handleSearch(e.target.value))}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            navigate('/provider/services')
                                        }
                                    }}
                                    placeholder="Search for Services by Location, provider, Price and more..."
                                    className="pl-10 pr-3 py-2 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 text-sm outline-none"
                                />
                            </div>
                            : <Link onClick={() => dispatch(handleLogout())} to="/" className="block px-3 py-1.5 text-sm rounded-3xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-background dark:hover:bg-red-600">Logout</Link>
                        }

                    </div>

                    {/* Notification (disabled) */}
                    <button disabled className="text-gray-400 cursor-not-allowed">
                        <Bell className="h-5 w-5" />
                    </button>

                    {/* Dark Mode Toggle (disabled) */}
                    <button disabled className="text-gray-400 cursor-not-allowed">
                        <Sun className="h-5 w-5" />
                    </button>
                </div>
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="h-6 w-6" />
                </button>

            </div>

            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2.5">
                    <button disabled className="text-sm text-gray-400 cursor-not-allowed">Notifications (Coming Soon)</button>
                    <button disabled className="text-sm text-gray-400 cursor-not-allowed">Dark Mode</button>
                    <button onClick={() => dispatch(handleLogout())} className="block text-sm text-red-500">Logout</button>
                </div>
            )}
        </header>
    )
}

export default ProviderHeader