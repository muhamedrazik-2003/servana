import { useEffect, useState } from 'react'
import AuthForm from '../../components/common/AuthForm'
import Logo from "../../assets/images/logo.png"
import { useSearchParams } from 'react-router-dom'

function Auth() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [registerAs, setRegisterAs] = useState(null)
  const [searchParams] = useSearchParams()
  const authMode = searchParams.get("mode");
  const registerRole = searchParams.get("role");

  useEffect(() => {
    if(authMode === "register") {
      setIsRegistered(true)
    }
    if(registerRole === "seeker") {
      setRegisterAs("seeker")
    }
    if (registerRole === "provider") {
      setRegisterAs("provider")
    }
  },[authMode])

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full transition-all lg:h-auto max-w-sm space-y-4">
        <div >
          <div className='flex items-center justify-center'>
            <img className='size-10' src={Logo} alt="logo image" />
            <h5 className='text-3xl font-semibold'>Servana</h5>
          </div>
          <p className="text-[14px] lg:text-lg text-center">Find trusted services around you</p>
        </div>
        <div className={`relative shadow-sm border w-[65%] lg:w-full rounded-4xl mx-auto text-center flex items-center mb-[2.5rem] lg:mb-[2rem] transition-all duration-100 ${(isRegistered && registerAs === "provider") ? "bg-amber-100" : (isRegistered && registerAs === "seeker") ? "bg-teal-100" : "bg-violet-200"}`}>
          <div className={`absolute left-0 rounded-3xl mx-1 w-[50%] h-8 lg:h-9.5 transition-all duration-300 ${isRegistered ? 'translate-x-[93%] lg:translate-x-[96%]' : ''} ${(isRegistered && registerAs === "provider") ? "bg-accent" : (isRegistered && registerAs === "seeker") ? "bg-secondary" : 'bg-primary'}`}></div>
          <h4
            onClick={() => {
              setIsRegistered(false);
              setRegisterAs(null);
            }}
            className={`z-10 text-sm cursor-pointer p-2 lg:p-3 w-[50%] ${isRegistered ? "" : "text-white" }`} >
            Login
          </h4>
          <h4
            onClick={() => {
              setIsRegistered(true);
              setRegisterAs(null);
            }}
            className={`z-10 text-sm p-2 lg:p-3 w-[50%] cursor-pointer ${(isRegistered && registerAs === "seeker") ? "text-black" : (isRegistered && registerAs === "provider" || isRegistered) ? "text-white" : "text-black"}`} >
            Register
          </h4>
        </div>
          <AuthForm formType={authMode} registerAs={registerAs} setRegisterAs={setRegisterAs} />
      </div>
    </div>
  )
}

export default Auth
