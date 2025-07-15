import React, { useState } from 'react'

function BookingSlidingTab() {
    const [activeTab, setActiveTab] = useState("ongoing")
    const getTranslateX = (activeTab) => {
        switch (activeTab) {
            case 'ongoing':
                return 'translate-x-0';
            case 'upcoming':
                return 'translate-x-[108%] md:translate-x-[97%] '; // 100%
            case 'completed':
                return 'translate-x-[215%] md:translate-x-[195%]'; // 200%
            case 'cancelled':
                return 'translate-x-[317%] md:translate-x-[293%]';
            case 'failed':
                return 'translate-x-[418%] md:translate-x-[390%]';
            default:
                return 'md:translate-x-0';
        }
    };

    return (
        <div className={`relative shadow-sm border md:max-w-[75%] md:rounded-4xl  lg:mx-auto text-center flex items-center mb-[2rem] lg:px-[10px] transition-all duration-100 bg-teal-50 dark:bg-teal-950 cursor-pointer`}>
            <div className={`absolute left-0 rounded-3xl mx-1 lg:mx-2 w-[19%] h-8 lg:h-12 transition-all duration-300 bg-secondary dark:bg-secondary ${getTranslateX(activeTab)}`}></div>
            <h3 onClick={() => setActiveTab("ongoing")} className={`z-10 p-4 py-3.5 md:p-5 w-[20%] text-xs md:text-base ${activeTab === 'ongoing' ? "text-background" : 'text-foreground'}`}>Ongoing</h3>
            <h3 onClick={() => setActiveTab("upcoming")} className={`z-10 p-4 py-3.5 md:p-5 w-[20%] text-xs md:text-base ${activeTab === 'upcoming' ? "text-background" : 'text-foreground'}`} >Upcoming</h3>
            <h3 onClick={() => setActiveTab("completed")} className={`z-10 p-4 py-3.5 md:p-5 w-[20%] text-xs md:text-base ${activeTab === 'completed' ? "text-background" : 'text-foreground'}`} >Completed</h3>
            <h3 onClick={() => setActiveTab("cancelled")} className={`z-10 p-4 py-3.5 md:p-5 w-[20%] text-xs md:text-base ${activeTab === 'cancelled' ? "text-background" : 'text-foreground'}`} >Cancelled</h3>
            <h3 onClick={() => setActiveTab("failed")} className={`z-10 p-4 py-3.5 md:p-5 w-[20%] text-xs md:text-base ${activeTab === 'failed' ? "text-background" : 'text-foreground'}`} >Failed</h3>
        </div>
    )
}

export default BookingSlidingTab