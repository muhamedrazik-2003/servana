import React, { useState } from 'react'
import OngoingTab from './OngoingTab';
import UpcomingTab from './UpcomingTab';
import CompletedTab from './CompletedTab';
import CancelledTab from './CancelledTab';
import FailedTab from './FailedTab';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector } from 'react-redux';

function BookingTabs({userRole}) {
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
    const getCurrentTab = (activeTab) => {
        switch (activeTab) {
            case 'ongoing':
                return <OngoingTab userRole={userRole}/>;
            case 'upcoming':
                return <UpcomingTab userRole={userRole}/>;
            case 'completed':
                return <CompletedTab userRole={userRole}/>;
            case 'cancelled':
                return <CancelledTab userRole={userRole}/>;
            case 'failed':
                return <FailedTab userRole={userRole}/>;
            default:
                return <OngoingTab userRole={userRole}/>;
        }
    }

    return (
        <>
            <div className='flex gap-3 items-center'>
                <div className={`${userRole === "provider" ? "md:w-[77%]" : "md:max-w-[70%] md:mx-auto "}  shadow-sm border  md:rounded-4xl bg-teal-50 dark:bg-teal-950 cursor-pointer p-2`}>
                    <div className={`relative  text-center flex items-center transition-all duration-300`}>
                        <div className={`absolute left-0 rounded-3xl w-[20%] md:w-[20%] h-9 ${userRole === "provider" ? "md:h-10" : "md:h-12"} transition-all duration-300 bg-secondary dark:bg-secondary ${getTranslateX(activeTab)}`}></div>
                        <h3 onClick={() => setActiveTab("ongoing")} className={`z-10  ${userRole === "provider" ? "p-1.5" : "p-2.5"} w-[20%] text-xs md:text-base ${activeTab === 'ongoing' ? "text-background" : 'text-foreground'}`}>Ongoing</h3>
                        <h3 onClick={() => setActiveTab("upcoming")} className={`z-10 ${userRole === "provider" ? "p-1.5" : "p-2.5"} w-[20%] text-xs md:text-base ${activeTab === 'upcoming' ? "text-background" : 'text-foreground'}`} >Upcoming</h3>
                        <h3 onClick={() => setActiveTab("completed")} className={`z-10 ${userRole === "provider" ? "p-1.5" : "p-2.5"} w-[20%] text-xs md:text-base ${activeTab === 'completed' ? "text-background" : 'text-foreground'}`} >Completed</h3>
                        <h3 onClick={() => setActiveTab("cancelled")} className={`z-10 ${userRole === "provider" ? "p-1.5" : "p-2.5"} w-[20%] text-xs md:text-base ${activeTab === 'cancelled' ? "text-background" : 'text-foreground'}`} >Cancelled</h3>
                        <h3 onClick={() => setActiveTab("failed")} className={`z-10 ${userRole === "provider" ? "p-1.5" : "p-2.5"} w-[20%] text-xs md:text-base ${activeTab === 'failed' ? "text-background" : 'text-foreground'}`} >Failed</h3>
                    </div>
                </div>
                {userRole === "provider"
                    && <Select>
                        <SelectTrigger className="w-[175px] !h-10 lg:!h-13 border-2 border-indigo-300 pl-6">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Recent Bookings</SelectItem>
                            <SelectItem value="oldest">Oldest Bookings</SelectItem>
                            <SelectItem value="within7days">Within 7 Days</SelectItem>
                        </SelectContent>
                    </Select>
                }

            </div>
            {/* current Tab */}
            {getCurrentTab(activeTab)}
        </>

    )
}

export default BookingTabs