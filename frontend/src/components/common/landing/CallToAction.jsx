import { Link } from 'react-router-dom'
import { Button } from '../../ui/button'
import finalCtaBackground from "../../../assets/images/ctaBackground.png"

function CallToAction() {
    return (
        <section className='text-center relative'>
            <h2 className='text-[2.5rem] lg:text-6xl'>Ready to Get Started?</h2>
            <p className='mb-20'>Become part of a community that values quality and simplicity.</p>
            <div className='flex flex-col lg:flex-row items-center justify-center gap-x-8'>
                <Link to={'/auth?mode=register&role=seeker'}><Button variant={'seeker'} size={'lg'}>Find a Service</Button></Link>
                <p className='font-semibold text-xl'>or</p>
                <Link to={'/auth?mode=register&role=provider'}><Button variant={'provider'} size={'lg'}>Become a Provider</Button></Link>
            </div>
            <img className='absolute top-[30%] lg:top-[10%] left-[50%] translate-x-[-50%] w-[160px] lg:w-[220px] z-[-1]' src={finalCtaBackground} alt="" />
        </section>

    )
}

export default CallToAction