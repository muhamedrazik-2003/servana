import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Landing from "./pages/common/Landing"
import Auth from "./pages/common/Auth"
import Contact from "./pages/common/Contact"
import About from "./pages/common/About"
import AllServices from "./pages/common/AllServices"

import SeekerHome from "./pages/seeker/Dashboard"
import SeekerBookings from "./pages/seeker/MyBookings"
import SeekerProfile from "./pages/seeker/Profile"
import BookingDetail from "./components/seeker/BookingDetail"


function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }) // or behavior: "auto"
  }, [pathname])
  return (
    <Routes>
      {/* common pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<AllServices />} />
      <Route path="/services/:id" element={<AllServices />} />
      {/* seeker pages */}
      <Route path="/seeker/home" element={<SeekerHome/>} />
      <Route path="/seeker/mybookings" element={<SeekerBookings/>} />
      <Route path="/seeker/mybookings/booking" element={<BookingDetail/>} />
      <Route path="/seeker/profile" element={<SeekerProfile/>} />
    </Routes>
  )
}

export default App