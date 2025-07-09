import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "../../ui/button"
import seekerImage from "../../../assets/images/seeker.png"
import providerImage from "../../../assets/images/provider.png"

function Hero() {
    return (
        <section className='relative max-w-[650px] mx-auto pt-[100px]'>
            <h1 className='text-[80px] leading-20'>Where Services Meet Simplicity</h1>
            <p className='text-xl max-w-[600px] font-semibold mb-24px lg:mb-[52px]'>Connect with trusted locals — whether you need help or offer it. Fast, easy, and reliable.</p>
            <img className='size-70 absolute top-42 left-[-38%] z-[-1]' src={seekerImage} alt="" />
            <img className='size-70 absolute top-42 right-[-35%] z-[-1]' src={providerImage} alt="" />
            <div className='flex items-center gap-x-8'>
                <Link to={'/auth'}><Button variant={'seeker'} size={'lg'}>Find a Service</Button></Link>
                <p className='font-semibold text-xl'>or</p>
                 <Link to={'/auth'}><Button variant={'provider'} size={'lg'}>Become a Provider</Button></Link>
            </div>
        </section>
    )
}

export default Hero