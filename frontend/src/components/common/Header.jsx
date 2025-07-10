import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import Logo from "../../assets/images/logo.png"
import { Menu } from 'lucide-react'
import { useState } from 'react'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <header className=' mx-[20px] md:mx-[40px] lg:mx-[80px] flex items-center justify-between py-4'>

            <div className='order-2 md:order-1 cursor-pointer ml-12 lg:mr-18'>
                <Link to={'/'} className='flex items-center'>
                    <img className='size-10 hidden md:block' src={Logo} alt="logo image" />
                    <h5 className='text-2xl font-semibold'>Servana</h5>
                </Link>
            </div>
            <div className='order-1 md:order-2 relative'>
                <Menu onClick={() => setMenuOpen(!menuOpen)} className='block md:hidden' />

                <nav className={`transform origin-top transition-all duration-300 ease-in-out ${menuOpen ? "scale-y-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"} md:scale-y-100 md:opacity-100 md:pointer-events-auto`}>
                    <ul className=' text-nowrap font-semibold flex flex-col gap-6 md:flex-row md:gap-10  absolute md:static top-[120%] left-[-35%] bg-background shadow md:shadow-none rounded-2xl border md:border-0 py-4 md:p-0 pl-4 pr-6'>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={"/#how-it-works"}>How it Works</Link></li>
                        <li><Link to={'/contact'}>Contact</Link></li>
                        <li><Link to={'/#provider-features'}>For Providers</Link></li>
                    </ul>
                </nav>
            </div>

            <div className='order-3 space-x-1 md:space-x-2 flex'>
                <Link to={'/auth'}>
                    <Button variant={'outline'} className={'hidden md:block'} >Login</Button>
                </Link>
                <Link to={'/auth'}>
                    <Button >Sign Up</Button>
                </Link>
            </div>
        </header >
    )
}

export default Header