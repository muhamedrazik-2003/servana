
function HowItWorks({isProvider,setIsProvider}) {
      const howItWorks = {
    seeker: ["Browse or post a request", "Get matched with local pros", "Chat, schedule, and pay", "Rate & review"],
    provider: ["Sign up as a provider", "Get verified and list services", "Start receiving service requests", "Earn & grow your business"]
  }
  return (
    
     <section id="how-it-works">
        <h2 className='text-center'>Who Are You ?</h2>
        <p className="text-center">See how Servana works for you.</p>
        <div className={`relative shadow-sm border max-w-[50%] rounded-4xl mx-auto text-center flex items-center mb-[2rem] transition-all duration-100 ${isProvider ? "bg-amber-100" : "bg-teal-100"}`}>
          {/* sliding bar */}
          <div className={`absolute left-0 rounded-3xl mx-2 w-[50%] h-12 transition-all duration-300 ${isProvider ? 'translate-x-[93%] bg-accent' : 'bg-secondary'}`}></div>

          <h3 onClick={() => setIsProvider(false)} className='z-10 cursor-pointer p-5 w-[50%]' >Seeker</h3>
          <h3 onClick={() => setIsProvider(true)} className={`z-10 p-5 w-[50%] cursor-pointer ${isProvider ? "text-white" : 'text-foreground'}`} >Provider</h3>
        </div>
        {/* s shaped lines */}
        <div className='relative'>
          <div className='rounded-l-full w-60  h-48 absolute flex justify-end items-center top-[18%] left-[29%] z-[-2] bg-linear-to-b from-primary to-secondary'>
            <div className='w-[95%] h-[90%]  bg-background rounded-l-full '></div>
          </div>
          <div className='rounded-r-full w-60  h-48 absolute flex items-center bottom-[2.7%] right-[29%] z-[-2] bg-linear-to-b from-secondary to-accent'>
            <div className='w-[95%] h-[90%]  bg-background rounded-r-full '></div>
          </div>

          <ol id='seeker-how-it-works' className='flex flex-col max-w-[80%] mx-auto text-xl'>
            {isProvider
              ? <>
                {
                  howItWorks.provider.map((step, index) => (
                    <li className='border-amber-600' key={index}>{index + 1}. {step}</li>
                  ))
                }
              </>
              : <>
                {
                  howItWorks.seeker.map((step, index) => (
                    <li className='border-teal-600' key={index}>{index + 1}. {step}</li>
                  ))
                }
              </>
            }
          </ol>
        </div>
      </section>
  )
}

export default HowItWorks