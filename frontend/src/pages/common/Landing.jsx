import React, { useState,useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Header from '../../components/common/Header'
import HowItWorks from '../../components/common/landing/HowItWorks'
import Hero from '../../components/common/landing/Hero'
import CoreFeaturesForSeeker from '../../components/common/landing/CoreFeaturesForSeeker'
import Testimonial from '../../components/common/landing/Testimonial'
import ServiceCategory from '../../components/common/ServiceCategory'
import CoreFeaturesForProviders from '../../components/common/landing/CoreFeaturesForProviders'
import seekerDash from "../../assets/images/SeekerDash.png"
import providerDash from "../../assets/images/ProviderDash.png"
import FAQ from '../../components/common/landing/FAQ'
import Footer from '../../components/common/Footer'
import CallToAction from '../../components/common/landing/CallToAction'

function Landing() {
  const [isProvider, setIsProvider] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <main>
      <Header />

      <Hero />

       <HowItWorks isProvider={isProvider} setIsProvider={setIsProvider} />

      <CoreFeaturesForSeeker />

      <ServiceCategory />

      <CoreFeaturesForProviders />

      <Testimonial isProvider={isProvider} setIsProvider={setIsProvider} />

      {/* proof section (screenshot) */}
      <section className='text-center mx-0'>
        <h2>See Servana in Action</h2>
        <p className='mb-[72x] mx-auto'>See how easy it is to navigate, book, and oversee services on Servana.</p>
        <div className='flex flex-col items-center lg:flex-row overflow-x-hidden px-[32px]'>
          <div className='w-full lg:w-[50%] lg:translate-x-[-20%]'>
            <img className=' rounded-3xl shadow-lg' src={seekerDash} alt="placeholder demo dash" />
            <h5 className='py-6 text-sm'>Customer's Dashboard</h5>
          </div>
          <div className='w-full lg:w-[50%] lg:translate-x-[20%]'>
            <img className=' rounded-3xl shadow-lg' src={providerDash} alt="placeholder demo dash" />
            <h5 className='py-6 text-sm'>Provider's Dashboard</h5>
          </div>
        </div>
      </section>

      <FAQ />

      <CallToAction />

      <Footer /> 
    </main>
  )
}

export default Landing
