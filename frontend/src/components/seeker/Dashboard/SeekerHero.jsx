import { MapPin, Search, ArrowRight } from "lucide-react"
import seekerHeroLeft from "../../../assets/images/seekerHeroLeft.png"
import seekerHeroRight from "../../../assets/images/seekerHeroRight.png"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { handleSearch } from '@/redux/slices/serviceSlice.js'
import { useNavigate } from "react-router-dom"
import { getAllServices } from "../../../redux/slices/serviceSlice"


function SeekerHero() {
    const [searchData, setSearchData] = useState('');
    const { services } = useSelector(state => state.serviceSlice);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (services.length === 0) {
            dispatch(getAllServices());
        }
    }, [])
    useEffect(() => {
    }, [searchData])
    const handleSearching = () => {
        dispatch(handleSearch(searchData))
        navigate('/seeker/services')
    }
    return (
        <section className='relative max-w-[750px] mx-auto px-6 md:px-0 pt-[80px] md:pt-[140px] md:pb-38 overflow-x-hidden md:overflow-x-visible'>
            <h1 className='text-[clamp(2rem,6vw,56px)] leading-11  md:leading-16 z-0 mb-[1rem]'>Need a Service?<br /> We’ve Got You Covered.</h1>
            <p className='max-w-[600px] text-sm md:text-base mx-auto font-semibold text-center pb-4 md:pb-0 px-8'>From home repairs to cleaning, connect with verified providers you can rely on.</p>
            <img className='h-65 lg:h-90 absolute top-40 lg:top-25 left-0 lg:left-[-20%] z-[-1]' src={seekerHeroLeft} alt="image of a person using mobile" />
            {/* <img className='h-50 lg:h-30 absolute top-62 lg:top-42 right-[-6%] lg:right-[-35%] z-[-1]' src={seekerHeroRight} alt="" /> */}
            <div className='flex items-center justify-center gap-2'>
                <div className="relative w-[95%] md:w-[75%] lg:w-[600px]">
                    <Search className="absolute left-3 top-3 size-5 md:size-6 text-primary" />
                    <input
                        onChange={(e) => setSearchData(e.target.value)}
                        type="text"
                        placeholder="Search By Service, Location, provider, Price and more..."
                        className="pl-9 md:pl-11 pr-4 py-2.5 w-full rounded-full border-2 bg-teal-50 dark:bg-gray-800 md:text-lg outline-none"
                    />
                </div>
                <Button onClick={handleSearching} size={'lg'} className='text-lg flex items-center gap-2 px-6'>
                   <span className="hidden md:block">Search</span>
                    <ArrowRight className="size-5 md:size-6" />
                </Button>
            </div>
        </section>
    )
}

export default SeekerHero