import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Landing from "./pages/common/Landing"
import Auth from "./pages/common/Auth"
import Contact from "./pages/common/Contact"
import About from "./pages/common/About"
import AllServices from "./pages/seeker/SeekerServices"
import ServiceDetail from "./pages/common/ServiceDetail"
import SeekerHome from "./pages/seeker/Dashboard"
import SeekerBookings from "./pages/seeker/SeekerBooking"
import Profile from "./pages/common/Profile"
import BookingDetail from "./pages/common/BookingDetail"
import ProviderDashboard from "./pages/provider/ProviderDashboard"
import ProviderBookings from "./pages/provider/ProviderBookings"
import ProviderServices from "./pages/provider/ProviderServices"
import { Toaster } from "./components/ui/sonner"
import NotFound from "./pages/common/NotFound"
import AddEditServiceForm from "./pages/provider/AddEditServiceForm"
import ProviderEarning from "./pages/provider/ProviderEarning"
import { Reviews } from "./pages/provider/Reviews"
import AdminDashboard from "./pages/admin/AdminDashboard"


function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" }) // or behavior: "auto"

    }
  }, [pathname, hash])
  return (
    <>
      <Routes>
        {/* common pages */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* seeker pages */}
        <Route path="/seeker/home" element={<SeekerHome />} />
        <Route path="/seeker/services" element={<AllServices />} />
        <Route path="/seeker/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/seeker/mybookings" element={<SeekerBookings />} />
        <Route path="/seeker/mybookings/:bookingId" element={<BookingDetail />} />
        <Route path="/seeker/profile" element={<Profile />} />

        {/* Provider Pages */}
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/bookings" element={<ProviderBookings />} />
        <Route path="/provider/services" element={<ProviderServices />} />
        <Route path="/provider/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/provider/mybookings/:bookingId" element={<BookingDetail />} />
        <Route path="/provider/profile" element={<Profile />} />
        <Route path="/provider/services/new" element={<AddEditServiceForm />} />
        <Route path="/provider/services/update/:serviceId" element={<AddEditServiceForm />} />
        <Route path="/provider/earnings" element={<ProviderEarning />} />
        <Route path="/provider/reviews" element={<Reviews />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Toaster toastOptions={{
        style: { borderRadius: "32px" },
      }} position="top-right" richColors />

    </>
  )
}

export default App