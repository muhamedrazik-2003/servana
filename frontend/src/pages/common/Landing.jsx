import React, { useState } from 'react'
import Header from '../../components/common/Header'
import HowItWorks from '../../components/common/landing/HowItWorks'
import Hero from '../../components/common/landing/Hero'
import CoreFeaturesForSeeker from '../../components/common/landing/CoreFeaturesForSeeker'
import Testimonial from '../../components/common/landing/Testimonial'
import ServiceCategory from '../../components/common/landing/ServiceCategory'
import CoreFeaturesForProviders from '../../components/common/landing/CoreFeaturesForProviders'
import demoDash from "../../assets/images/dashDemo.png"
import FAQ from '../../components/common/landing/FAQ'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import finalCtaBackground from "../../assets/images/ctaBackground.png"

function Landing() {
  const [isProvider, setIsProvider] = useState(false)
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

      {/* Final Call to Action */}
      <section className='text-center relative'>
        <h2 className='text-6xl'>Ready to Get Started?</h2>
        <p>Become part of a community that values quality and simplicity.</p>
        <div className='flex items-center gap-x-8 justify-center mt-[100px]'>
          <Link to={'/auth'}><Button variant={'seeker'} size={'lg'}>Find a Service</Button></Link>
          <p className='font-semibold text-xl'>or</p>
          <Link to={'/auth'}><Button variant={'provider'} size={'lg'}>Become a Provider</Button></Link>
        </div>
        <img className='absolute top-[10%] left-[50%] translate-x-[-50%] w-[220px] z-[-1]' src={finalCtaBackground} alt="" />
      </section>
    </main>
  )
}

export default Landing
