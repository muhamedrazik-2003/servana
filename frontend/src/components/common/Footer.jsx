import { Instagram, Twitter } from "lucide-react";
import Logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";

function Footer({ userRole }) {
  return (
    <footer className="bg-[#180835] text-gray-300 pt-18 pb-4 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">

        <div>
          <div className="flex items-center mb-2">
            <img src={Logo} alt="Servana logo" className="w-10" />
            <h3 className="text-white font-bold text-2xl">Servana</h3>
          </div>
          <p className="text-sm ml-2">Local services, made simple.</p>
          <div className="flex gap-4 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,191.13V156h20a12,12,0,0,0,0-24H140V112a12,12,0,0,1,12-12h16a12,12,0,0,0,0-24H152a36,36,0,0,0-36,36v20H96a12,12,0,0,0,0,24h20v55.13a84,84,0,1,1,24,0Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M218.12,209.56l-61-95.8,59.72-65.69a12,12,0,0,0-17.76-16.14L143.81,92.77,106.12,33.56A12,12,0,0,0,96,28H48A12,12,0,0,0,37.88,46.44l61,95.8L39.12,207.93a12,12,0,1,0,17.76,16.14l55.31-60.84,37.69,59.21A12,12,0,0,0,160,228h48a12,12,0,0,0,10.12-18.44ZM166.59,204,69.86,52H89.41l96.73,152Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM176,20H80A60.07,60.07,0,0,0,20,80v96a60.07,60.07,0,0,0,60,60h96a60.07,60.07,0,0,0,60-60V80A60.07,60.07,0,0,0,176,20Zm36,156a36,36,0,0,1-36,36H80a36,36,0,0,1-36-36V80A36,36,0,0,1,80,44h96a36,36,0,0,1,36,36ZM196,76a16,16,0,1,1-16-16A16,16,0,0,1,196,76Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M216,20H40A20,20,0,0,0,20,40V216a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V40A20,20,0,0,0,216,20Zm-4,192H44V44H212ZM112,176V120a12,12,0,0,1,21.43-7.41A40,40,0,0,1,192,148v28a12,12,0,0,1-24,0V148a16,16,0,0,0-32,0v28a12,12,0,0,1-24,0ZM96,120v56a12,12,0,0,1-24,0V120a12,12,0,0,1,24,0ZM68,80A16,16,0,1,1,84,96,16,16,0,0,1,68,80Z"></path></svg>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-base mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={`${userRole === "provider" ? "/provider/about" : userRole === "seeker" ? "/seeker/about" : "/about"}`} className="hover:text-white">About Us</Link></li>
            <li><Link to={`${userRole === "provider" ? "/provider/contact" : userRole === "seeker" ? "/seeker/contact" : "/contact"}`} className="hover:text-white">Contact Us</Link></li>
            <li><Link to={`${userRole === "provider" ? "/provider/contact" : userRole === "seeker" ? "/seeker/contact" : "/contact"}`} className="hover:text-white">Report A Problem</Link></li>
            <li><Link to={`${userRole === "provider" ? "/provider/contact" : userRole === "seeker" ? "/seeker/contact" : "/contact"}`} className="hover:text-white">Feedback</Link></li>
          </ul>
        </div>
        {
          userRole === 'provider'
            ? <div>
              <h4 className="text-white font-semibold text-base mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-white">My Dashboard</Link></li>
                <li><a href="#" className="hover:text-white">Booking</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Reviews</a></li>
                <li><a href="#" className="hover:text-white">Earnings</a></li>
              </ul>
            </div>
            :
            <div>
              <h4 className="text-white font-semibold text-base mb-3">For Customers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to={'/auth?mode=register&role=seeker'} className="hover:text-white">Get Started</Link></li>
                <li><a href="#seeker-features" className="hover:text-white">Features</a></li>
                <li><a href="#categories" className="hover:text-white">Service Categories</a></li>
                <li><a href="#faqs" className="hover:text-white">Customer FAQs</a></li>
              </ul>
            </div>
        }
        {
          userRole === 'seeker'
            ? <div>
              <h4 className="text-white font-semibold text-base mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-white">My Profile</Link></li>
                <li><a href="#" className="hover:text-white">Booking</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Logout</a></li>
              </ul>
            </div>

            : <div>
              <h4 className="text-white font-semibold text-base mb-3">For Providers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to={'/auth?mode=register&role=provider'} className="hover:text-white">Become a Provider</Link></li>
                <li><a href="#provider-features" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Payment</a></li>
                <li><a href="#faqs" className="hover:text-white">Provider FAQs</a></li>
              </ul>
            </div>
        }
      </div>

      <div className="mt-12 text-center text-xs text-gray-400">
        © 2025 Servana. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;