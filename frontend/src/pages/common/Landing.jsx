import React, { useState,useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Header from '../../components/common/Header'
import HowItWorks from '../../components/common/landing/HowItWorks'
import Hero from '../../components/common/landing/Hero'
import CoreFeaturesForSeeker from '../../components/common/landing/CoreFeaturesForSeeker'
import Testimonial from '../../components/common/landing/Testimonial'
import ServiceCategory from '../../components/common/landing/ServiceCategory'
import CoreFeaturesForProviders from '../../components/common/landing/CoreFeaturesForProviders'
import demoDash from "../../assets/images/dashDemo.png"
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

      {/* <Hero />

      <HowItWorks isProvider={isProvider} setIsProvider={setIsProvider} />

      <CoreFeaturesForSeeker />

      <ServiceCategory />

      <CoreFeaturesForProviders />

      <Testimonial isProvider={isProvider} setIsProvider={setIsProvider} />

      {/* proof section (screenshot) 
      <section className='text-center mx-0'>
        <h2>See Servana in Action</h2>
        <p className='mb-[72x]'>See how easy it is to navigate, book, and oversee services on Servana.</p>
        <div className='flex overflow-x-hidden'>
          <div className='w-[50%] translate-x-[-20%]'>
            <img className=' rounded-3xl shadow-lg' src={demoDash} alt="placeholder demo dash" />
            <h5 className='pt-6 text-sm'>Customer's Dashboard</h5>
          </div>
          <div className='w-[50%] translate-x-[20%]'>
            <img className=' rounded-3xl shadow-lg' src={demoDash} alt="placeholder demo dash" />
            <h5 className='pt-6 text-sm'>Provider's Dashboard</h5>
          </div>
        </div>
      </section>

      <FAQ />

      <CallToAction />

      <Footer /> */}
    </main>
  )
}

export default Landing
