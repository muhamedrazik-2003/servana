import { MapPin, Search } from "lucide-react"
import seekerHeroLeft from "../../../assets/images/seekerHeroLeft.png"
import seekerHeroRight from "../../../assets/images/seekerHeroRight.png"
function SeekerHero() {
    return (
        <section className='relative max-w-[750px] mx-auto px-8 md:px-0 pt-[80px] md:pt-[120px] md:pb-38 overflow-x-hidden md:overflow-x-visible'>
            <h1 className='text-[clamp(2.5rem,6vw,56px)] leading-11  md:leading-18 z-0 mb-[1rem]'>Need a Service?<br /> We’ve Got You Covered.</h1>
            <p className='max-w-[600px] mx-auto font-semibold text-center pb-10 md:pb-0 px-8'>From home repairs to cleaning, connect with verified providers you can rely on.</p>
            <img className='h-50 lg:h-60 absolute top-68 lg:top-30 left-0 lg:left-[-15%] z-[-1]' src={seekerHeroLeft} alt="image of a person using mobile" />
            {/* <img className='h-50 lg:h-30 absolute top-62 lg:top-42 right-[-6%] lg:right-[-35%] z-[-1]' src={seekerHeroRight} alt="" /> */}
            <div className='flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-2'>
                <div className="relative w-[95%] md:w-[75%] lg:w-[240px]">
                    <MapPin className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
                    <input
                        type="text"
                        placeholder="Your Location..."
                        className="pl-9 md:pl-11 pr-4 py-2 md:py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text-lg outline-none"
                    />
                </div>
                <div className="relative w-[95%] md:w-[75%] lg:w-[400px]">
                    <Search className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="pl-9 md:pl-11 pr-4 py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text-lg outline-none"
                    />
                </div>
            </div>
        </section>
    )
}

export default SeekerHero