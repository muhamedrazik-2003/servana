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
import AllSeekers from "./pages/admin/AllSeekers"
import AllProviders from "./pages/admin/AllProviders"
import AdminAllServices from "./pages/admin/ManageServices"
import AdminAllBookings from "./pages/admin/ManageBookings"
import AdminAllCategories from "./pages/admin/ManageCategories"
import Feedbacks from "./pages/admin/Feedbacks"
import { useDispatch, useSelector } from "react-redux"
import { handleAuthentication } from "./redux/slices/userSlice"


function App() {
  const { pathname, hash } = useLocation()
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.userSlice);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(handleAuthentication());
    }
  }, [dispatch]);

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
        <Route path="/seeker/home" element={isAuthenticated ? <SeekerHome /> : <Auth />} />
        <Route path="/seeker/services" element={isAuthenticated ? <AllServices /> : <Auth />} />
        <Route path="/seeker/services/:serviceId" element={isAuthenticated ? <ServiceDetail /> : <Auth />} />
        <Route path="/seeker/mybookings" element={isAuthenticated ? <SeekerBookings /> : <Auth />} />
        <Route path="/seeker/mybookings/:bookingId" element={isAuthenticated ? <BookingDetail /> : <Auth />} />
        <Route path="/seeker/profile" element={isAuthenticated ? <Profile /> : <Auth />} />
        <Route path="/seeker/contact" element={isAuthenticated ? <Contact /> : <Auth />} />
        <Route path="/seeker/about" element={isAuthenticated ? <About /> : <Auth />} />

        {/* Provider Pages */}
        <Route path="/provider/dashboard" element={isAuthenticated ? <ProviderDashboard /> : <Auth />} />
        <Route path="/provider/bookings" element={isAuthenticated ? <ProviderBookings /> : <Auth />} />
        <Route path="/provider/services" element={isAuthenticated ? <ProviderServices /> : <Auth />} />
        <Route path="/provider/services/:serviceId" element={isAuthenticated ? <ServiceDetail /> : <Auth />} />
        <Route path="/provider/mybookings/:bookingId" element={isAuthenticated ? <BookingDetail /> : <Auth />} />
        <Route path="/provider/profile" element={isAuthenticated ? <Profile /> : <Auth />} />
        <Route path="/provider/services/new" element={isAuthenticated ? <AddEditServiceForm /> : <Auth />} />
        <Route path="/provider/services/update/:serviceId" element={isAuthenticated ? <AddEditServiceForm /> : <Auth />} />
        <Route path="/provider/earnings" element={isAuthenticated ? <ProviderEarning /> : <Auth />} />
        <Route path="/provider/reviews" element={isAuthenticated ? <Reviews /> : <Auth />} />
        <Route path="/provider/contact" element={isAuthenticated ? <Contact /> : <Auth />} />
        <Route path="/provider/about" element={isAuthenticated ? <About /> : <Auth />} />

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard /> : <Auth />} />
        <Route path="/admin/seekers" element={isAuthenticated ? <AllSeekers /> : <Auth />} />
        <Route path="/admin/providers" element={isAuthenticated ? <AllProviders /> : <Auth />} />
        <Route path="/admin/services" element={isAuthenticated ? <AdminAllServices /> : <Auth />} />
        <Route path="/admin/services/:serviceId" element={isAuthenticated ? <ServiceDetail /> : <Auth />} />
        <Route path="/admin/services/new" element={isAuthenticated ? <AddEditServiceForm /> : <Auth />} />
        <Route path="/admin/services/update/:serviceId" element={isAuthenticated ? <AddEditServiceForm /> : <Auth />} />
        <Route path="/admin/bookings" element={isAuthenticated ? <AdminAllBookings /> : <Auth />} />
        <Route path="/admin/bookings/:bookingId" element={isAuthenticated ? <BookingDetail /> : <Auth />} />
        <Route path="/admin/categories" element={isAuthenticated ? <AdminAllCategories /> : <Auth />} />
        <Route path="/admin/reviews" element={isAuthenticated ? <Reviews /> : <Auth />} />
        <Route path="/admin/feedbacks" element={isAuthenticated ? <Feedbacks /> : <Auth />} />
        <Route path="/admin/profile" element={isAuthenticated ? <Profile /> : <Auth />} />

      </Routes>
      <Toaster toastOptions={{
        style: { borderRadius: "32px" },
      }} position="top-right" richColors />

    </>
  )
}

export default App