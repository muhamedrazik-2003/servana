import React from 'react'
import AuthForm from '../../components/common/AuthForm'
import { useState } from 'react'
import Logo from "../../assets/images/logo.png"

function Auth() {
  const [isRegistered, setIsRegistered] = useState(false)
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm space-y-4">
        <div >
          <div className='flex items-center justify-center'>
            <img className='size-10' src={Logo} alt="logo image" />
            <h5 className='text-3xl font-semibold'>Servana</h5>
          </div>
          <p className="text-[14px] lg:text-lg text-center">Find trusted services around you</p>
        </div>
        <div className={`relative shadow-sm border w-[65%] md:max-w-[50%] rounded-4xl mx-auto text-center flex items-center mb-[2.5rem] lg:mb-[2rem] transition-all duration-100 ${isRegistered ? "bg-amber-100" : "bg-teal-100"}`}>
          <div className={`absolute left-0 rounded-3xl mx-1 w-[50%] h-8 transition-all duration-300 ${isRegistered ? 'translate-x-[93%] bg-accent' : 'bg-secondary'}`}></div>
          <h4 onClick={() => { setIsRegistered(false); console.log(isRegistered) }} className='z-10 text-sm cursor-pointer p-2 w-[50%]' >Login</h4>
          <h4 onClick={() => setIsRegistered(true)} className={`z-10 text-sm p-2 w-[50%] cursor-pointer ${isRegistered ? "text-white" : 'text-foreground'}`} >Register</h4>
        </div>
        {isRegistered
          ? <AuthForm formType={"register"} />
          : <AuthForm formType={"login"} />
        }
      </div>
    </div>
  )
}

export default Auth
