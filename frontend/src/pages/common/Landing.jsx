import React, { useState } from 'react'
import Header from '../../components/common/Header'
import HowItWorks from '../../components/common/landing/HowItWorks'
import Hero from '../../components/common/landing/Hero'
import Testimonial from '../../components/common/landing/Testimonial'

function Landing() {
  const [isProvider, setIsProvider] = useState(false)
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks isProvider={isProvider} setIsProvider={setIsProvider} />
      <Testimonial isProvider={isProvider} setIsProvider={setIsProvider}/>
    </main>
  )
}

export default Landing
