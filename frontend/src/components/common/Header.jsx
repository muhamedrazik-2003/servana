import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import Logo from "../../assets/images/logo.png"

function Header() {
    return (
        <header className=' mx-[20px] md:mx-[40px] lg:mx-[80px] flex items-center justify-between py-4'>
            <div className='flex items-center cursor-pointer mr-18'>
                <Link to={'/'}>
                    <img className='size-10' src={Logo} alt="logo image" />
                </Link>
                <h5 className='text-2xl font-semibold'>Servana</h5>
            </div>
            <nav className='hidden lg:block'>
                <ul className='flex gap-10 font-semibold'>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><a href="#how-it-works">How it Works</a></li>
                    <li><Link to={'/contact'}>Contact</Link></li>
                    <li><a href="#for-providers">For Providers</a></li>
                </ul>
            </nav>
            <div className='space-x-2'>
                <Button variant={'outline'} >Login</Button>
                <Button >Sign Up</Button>
            </div>
        </header>
    )
}

export default Header