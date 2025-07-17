import React, { useState } from 'react'
import OngoingTab from './OngoingTab';
import UpcomingTab from './UpcomingTab';
import CompletedTab from './CompletedTab';
import CancelledTab from './CancelledTab';
import FailedTab from './FailedTab';

function BookingTabs() {
    const [activeTab, setActiveTab] = useState("ongoing")
    const getTranslateX = (activeTab) => {
        switch (activeTab) {
            case 'ongoing':
                return 'translate-x-0';
            case 'upcoming':
                return 'translate-x-[100%] ';
            case 'completed':
                return 'translate-x-[200%]';
            case 'cancelled':
                return 'translate-x-[300%]';
            case 'failed':
                return 'translate-x-[400%]';
            default:
                return 'md:translate-x-0';
        }
    };
    const getCurrentTab =(activeTab) => {
        switch (activeTab) {
            case 'ongoing':
                return <OngoingTab/>;
            case 'upcoming':
                return <UpcomingTab/>;
            case 'completed':
                return <CompletedTab/>;
            case 'cancelled':
                return <CancelledTab/>;
            case 'failed':
                return <FailedTab/>;
            default:
                return <OngoingTab/>;
        }
    }

    return (
        <>
            <div className=' md:max-w-[70%] shadow-sm border  md:rounded-4xl  md:mx-auto  bg-teal-50 dark:bg-teal-950 cursor-pointer p-2'>
                <div className={`relative  text-center flex items-center transition-all duration-300`}>
                    <div className={`absolute left-0 rounded-3xl w-[20%] md:w-[20%] h-9 md:h-12 transition-all duration-300 bg-secondary dark:bg-secondary ${getTranslateX(activeTab)}`}></div>
                    <h3 onClick={() => setActiveTab("ongoing")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'ongoing' ? "text-background" : 'text-foreground'}`}>Ongoing</h3>
                    <h3 onClick={() => setActiveTab("upcoming")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'upcoming' ? "text-background" : 'text-foreground'}`} >Upcoming</h3>
                    <h3 onClick={() => setActiveTab("completed")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'completed' ? "text-background" : 'text-foreground'}`} >Completed</h3>
                    <h3 onClick={() => setActiveTab("cancelled")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'cancelled' ? "text-background" : 'text-foreground'}`} >Cancelled</h3>
                    <h3 onClick={() => setActiveTab("failed")} className={`z-10 p-2.5 w-[20%] text-xs md:text-base ${activeTab === 'failed' ? "text-background" : 'text-foreground'}`} >Failed</h3>
                </div>
            </div>
            {/* current Tab */}
            {getCurrentTab(activeTab)}
        </>

    )
}

export default BookingTabs