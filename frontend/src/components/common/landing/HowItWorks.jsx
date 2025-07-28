
function HowItWorks({isProvider,setIsProvider}) {
      const howItWorks = {
    seeker: ["Browse or post a request", "Get matched with local pros", "Chat, schedule, and pay", "Rate & review"],
    provider: ["Sign up as a provider", "Get verified and list services", "Start receiving service requests", "Earn & grow your business"]
  }
  return (
    
     <section id="how-it-works">
        <h2 className='text-center'>Who Are You ?</h2>
        <p className="text-center mx-auto">See how Servana works for you.</p>
        {/* sliding bar */}
        <div className={`relative shadow-sm border md:max-w-[50%] rounded-4xl mx-auto text-center flex items-center mb-[2rem] transition-all duration-100 ${isProvider ? "bg-amber-100 dark:bg-amber-950" : "bg-teal-100 dark:bg-teal-950"}`}>
          <div className={`absolute left-0 rounded-3xl mx-2 w-[50%] h-12 transition-all duration-300 ${isProvider ? 'translate-x-[93%] bg-accent dark:bg-accent' : 'bg-secondary dark:bg-secondary'}`}></div>
          <h3 onClick={() => setIsProvider(false)} className={`z-10 cursor-pointer p-5 w-[50%] ${isProvider ? "" : 'text-background'}`}>Seeker</h3>
          <h3 onClick={() => setIsProvider(true)} className={`z-10 p-5 w-[50%] cursor-pointer ${isProvider ? "text-foreground dark:text-background" : 'text-foreground'}`} >Provider</h3>
        </div>
        
        {/* s shaped lines */}
        <div className='relative'>
          <div className='rounded-l-full w-45 lg:w-60 h-40 lg:h-48 absolute flex justify-end items-center top-[18%] left-[10%] lg:left-[29%] z-[-2] bg-linear-to-b from-primary to-secondary'>
            <div className='w-[95%] h-[90%]  bg-background rounded-l-full '></div>
          </div>
          <div className='rounded-r-full w-45 lg:w-60  h-40 lg:h-48 absolute flex items-center bottom-[2.7%] right-[15%] lg:right-[29%] z-[-2] bg-linear-to-b from-secondary to-accent'>
            <div className='w-[95%] h-[90%]  bg-background rounded-r-full '></div>
          </div>

          <ol id='seeker-how-it-works' className='flex flex-col md:max-w-[80%] mx-auto md:text-xl'>
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