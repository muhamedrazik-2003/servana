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


function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }) // or behavior: "auto"
  }, [pathname])
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
        <Route path="/seeker/services/detail" element={<ServiceDetail />} />
        <Route path="/seeker/mybookings" element={<SeekerBookings />} />
        <Route path="/seeker/mybookings/booking" element={<BookingDetail />} />
        <Route path="/seeker/profile" element={<Profile />} />

        {/* Provider Pages */}
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/bookings" element={<ProviderBookings />} />
        <Route path="/provider/services" element={<ProviderServices />} />
        <Route path="/provider/services/detail" element={<ServiceDetail />} />
        <Route path="/provider/mybookings/booking" element={<BookingDetail />} />
        <Route path="/provider/profile" element={<Profile />} />
        <Route path="/provider/services/new" element={<AddEditServiceForm />} />
        <Route path="/provider/services/update" element={<AddEditServiceForm />} />
      
      </Routes>
      <Toaster toastOptions={{
        style: { borderRadius: "32px" },
      }} position="top-right" richColors />

    </>
  )
}

export default App