import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "../../ui/button"
import seekerImage from "../../../assets/images/seeker.png"
import providerImage from "../../../assets/images/provider.png"

function Hero() {
    return (
        <section className='relative max-w-[650px] mx-auto px-6 md:px-0 pt-[50px] md:pt-[100px] overflow-x-hidden md:overflow-x-visible'>
            <h1 className='text-[clamp(2.2rem,10vw,80px)] leading-13  md:leading-20 z-0'>Where Services Meet Simplicity</h1>
            <p className='max-w-[600px] mx-auto font-semibold text-center px-6'>Connect with trusted locals — whether you need help or offer it. Fast, easy, and reliable.</p>
            <img className='size-50 lg:size-70 absolute top-62 lg:top-42 left-[-8%] lg:left-[-38%] z-[-1]' src={seekerImage} alt="image of a person using laptop" />
            <img className='size-50 lg:size-70 absolute top-62 lg:top-42 right-[-6%] lg:right-[-35%] z-[-1]' src={providerImage} alt="" />
            <div className='flex flex-col lg:flex-row items-center justify-center gap-x-8'>
                <Link to={'/auth'}><Button variant={'seeker'} size={'lg'}>Find a Service</Button></Link>
                <p className='font-semibold text-xl'>or</p>
                 <Link to={'/auth'}><Button variant={'provider'} size={'lg'}>Become a Provider</Button></Link>
            </div>
        </section>
    )
}

export default Hero