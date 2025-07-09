import React from 'react'
import Header from "../../components/common/Header"
import aboutHeroImage from "../../assets/images/ChatGPT Image Jul 10, 2025, 12_19_23 AM.png"
import communityImage from "../../assets/images/Stylized Miniature Model Town.png"
import Testimonial from '../../components/common/landing/Testimonial'
import Footer from "../../components/common/Footer"
import CallToAction from '../../components/common/landing/CallToAction'

function About() {
  return (
    <main>
      <Header />
      <section className='flex gap-20 mx-[180px] pt-[100px]'>
        <div>
          <h1 className='text-[64px] leading-18 text-start'>Helping Locals Find Trusted Services, Instantly.</h1>
          <p className='text-lg font-semibold mb-24px lg:mb-[52px]'>At Servana, we believe that every neighborhood deserves access to trusted professionals—delivered fast, fairly, and safely.</p>
        </div>

        <img className='size-75' src={aboutHeroImage} alt="" />
        {/* <img className='size-70 absolute top-42 right-[-35%] z-[-1]' src={providerImage} alt="" /> */}
      </section>
      <section>
        <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Column - Text */}
          <div className="lg:w-1/2 ">
            <h2>Why We Started</h2>
            <p className="text-lg leading-relaxed">
              Servana was born in the heart of Kerala with a simple idea: to make finding trusted local help effortless.
              Whether it's a plumber, a yoga instructor, or a tutor — people deserve a better way to connect with skilled providers near them.
            </p>
            <p className="text-lg mt-4 leading-relaxed">
              We experienced firsthand the struggle of unreliable listings, countless phone calls, and unverified service quality.
              So we set out to build a platform that connects real people with real local talent — quickly, clearly, and with confidence.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src={communityImage}
              alt="Local community connection"
              className="w-full object-cover aspect-4/3 rounded-2xl shadow-md"
            />
          </div>

        </div>
      </section>

      <Testimonial aboutSection={true} />
      <CallToAction />
      <Footer />
    </main>
  )
}

export default About