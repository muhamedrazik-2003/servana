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
      <section className='relative max-w-[650px] text-center mx-auto pt-[100px]'>
        <h1 className='text-[80px] leading-20 font-extrabold mb-24px lg:mb-[40px]'>Where Services Meet Simplicity</h1>
        <p className='text-2xl max-w-[600px] font-semibold mb-24px lg:mb-[52px]'>Connect with trusted locals — whether you need help or offer it. Fast, easy, and reliable.</p>
        <img className='size-70 absolute top-42 left-[-38%] z-[-1]' src={seekerImage} alt="" />
        <img className='size-70 absolute top-42 right-[-35%] z-[-1]' src={providerImage} alt="" />
        <div className='flex items-center gap-x-8'>
          <Button variant={'seeker'} size={'lg'}>Find a Service</Button>
          <p className='font-semibold text-xl'>or</p>
          <Button variant={'provider'} size={'lg'}>Become a Provider</Button>
        </div>
      </section>
    </main>
  )
}

export default Landing
