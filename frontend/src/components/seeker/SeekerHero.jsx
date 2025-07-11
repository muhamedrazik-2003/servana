import { MapPin, Search } from "lucide-react"

function SeekerHero() {
    return (
        <section className='relative max-w-[750px] mx-auto px-6 md:px-0 pt-[50px] md:pt-[100px] overflow-x-hidden md:overflow-x-visible'>
            <h1 className='text-[clamp(2rem,6vw,56px)] leading-11  md:leading-18 z-0 mb-[1.5rem]'>Need a Service?<br /> We’ve Got You Covered.</h1>
            <p className='max-w-[600px] mx-auto font-semibold text-center px-6'>From home repairs to cleaning, connect with verified providers you can rely on.</p>
            {/* <img className='size-50 lg:size-70 absolute top-62 lg:top-42 left-[-8%] lg:left-[-38%] z-[-1]' src={seekerImage} alt="image of a person using laptop" />
            <img className='size-50 lg:size-70 absolute top-62 lg:top-42 right-[-6%] lg:right-[-35%] z-[-1]' src={providerImage} alt="" /> */}
            <div className='flex flex-col lg:flex-row items-center justify-center gap-x-2'>
                <div className="relative w-[200px]">
                    <MapPin className="absolute left-3 top-3 h-6 w-6 text-primary" />
                    <input
                        type="text"
                        placeholder="Your Location..."
                        className="pl-11 pr-4 py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 text-lg outline-none"
                    />
                </div>
                <div className="relative w-[350px]">
                    <Search className="absolute left-3 top-3 h-6 w-6 text-primary" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="pl-11 pr-3 py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 text-lg outline-none"
                    />
                </div>
            </div>
        </section>
    )
}

export default SeekerHero