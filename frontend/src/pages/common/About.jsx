import React from 'react'
import Header from "../../components/common/Header"
import aboutHeroImage from "../../assets/images/ChatGPT Image Jul 10, 2025, 12_19_23 AM.png"
import communityImage from "../../assets/images/Stylized Miniature Model Town.png"
import Testimonial from '../../components/common/landing/Testimonial'
import Footer from "../../components/common/Footer"
import CallToAction from '../../components/common/landing/CallToAction'
import {
  ShieldCheck,
  Users,
  Star,
  Handshake,
  Compass,
  Sparkles
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function About() {
  const coreValues = [
    {
      title: "Trust & Transparency",
      description: "We ensure verified service providers and honest reviews — no hidden charges, no surprises.",
      icon: ShieldCheck,
    },
    {
      title: "Local Empowerment",
      description: "We uplift local talent by connecting them directly with people in their neighborhood.",
      icon: Users,
    },
    {
      title: "Quality First",
      description: "We prioritize top-notch service experiences for every user — customers and providers alike.",
      icon: Star,
    },
    {
      title: "Simplicity",
      description: "Finding or offering a service should never be complicated. Servana makes it smooth and intuitive.",
      icon: Compass,
    },
    {
      title: "Community Support",
      description: "We’re building more than a platform — we’re building trust between people who live nearby.",
      icon: Handshake,
    },
    {
      title: "Innovation with Empathy",
      description: "We solve real-life local problems with smart technology and a human-first mindset.",
      icon: Sparkles,
    },
  ];
  return (
    <main>
      <Header />

      <section className='flex gap-20 mx-[180px] pt-[100px]'>
        <div>
          <h1 className='text-[64px] leading-18 text-start'>Helping Locals Find Trusted Services, Instantly.</h1>
          <p className='text-lg font-semibold mb-24px lg:mb-[52px]'>At Servana, we believe that every neighborhood deserves access to trusted professionals—delivered fast, fairly, and safely.</p>
        </div>
        <img className='size-75' src={aboutHeroImage} alt="" />
      </section>

      <section>
        <div className="mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12">
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

      <section>
        <h2>Our Core Values</h2>
        <p>The principles that drive everything we do — from platform design to user experience.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <Card
              key={index}
              className={'p-1'}
            >
              <CardContent className="p-6 flex flex-col gap-3">
                <div>
                  <value.icon className="w-8 h-8 text-violet-600 dark:text-violet-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Testimonial aboutSection={true} />
      <CallToAction />
      <Footer />
    </main>
  )
}

export default About