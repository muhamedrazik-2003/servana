import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import Header from '../../components/common/Header'
import seekerImage from "../../assets/images/seeker.png"
import providerImage from "../../assets/images/provider.png"

function Landing() {
  return (
    <main>
      <Header />
      <section className='relative max-w-[650px] mx-auto pt-[100px]'>
        <h1 className='text-[80px] leading-20'>Where Services Meet Simplicity</h1>
        <p className='text-xl max-w-[600px] font-semibold mb-24px lg:mb-[52px]'>Connect with trusted locals — whether you need help or offer it. Fast, easy, and reliable.</p>
        <img className='size-70 absolute top-42 left-[-38%] z-[-1]' src={seekerImage} alt="" />
        <img className='size-70 absolute top-42 right-[-35%] z-[-1]' src={providerImage} alt="" />
        <div className='flex items-center gap-x-8'>
          <Button variant={'seeker'} size={'lg'}>Find a Service</Button>
          <p className='font-semibold text-xl'>or</p>
          <Button variant={'provider'} size={'lg'}>Become a Provider</Button>
        </div>
      </section>
      <section>
        <h2 className='text-[62px]'>Who Are You ?</h2>
        <p>See how Servana works for you.</p>
        <div className='relative bg-teal-100 shadow-sm border max-w-[50%] rounded-4xl mx-auto p-5 flex items-center justify-around z-[-2] mb-[2rem]'>
          <h3>Seeker</h3>
          <h3>Provider</h3>
          <div className='absolute left-0 rounded-3xl mx-2 bg-secondary w-[50%] h-12 z-[-1]'></div>
        </div>
        <div className='relative'>
          <div className='rounded-l-full w-60  h-48 absolute flex justify-end items-center top-[18%] left-[29%] z-[-2] bg-linear-to-b from-primary to-secondary'>
            <div className='w-[95%] h-[90%]  bg-background rounded-l-full '></div>
          </div>
          <div className='rounded-r-full w-60  h-48 absolute flex items-center bottom-[5.3%] right-[29%] z-[-2] bg-linear-to-b from-secondary to-accent'>
            <div className='w-[95%] h-[90%]  bg-background rounded-r-full '></div>
          </div>
          <ol id='seeker-how-it-works' className='flex flex-col max-w-[80%] mx-auto text-2xl'>
            <li className=''>Browse your request</li>
            <li>Get matched with local pros</li>
            <li>Chat, schedule, and pay</li>
            <li>Rate & review</li>
          </ol>
        </div>
      </section>

    </main>
  )
}

export default Landing
