import React from 'react'
import { Button } from '../../ui/button'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react';

function CoreFeaturesForProviders() {
    const providerFeatures = [
        {
            title: "Instant Job Alerts",
            description: "Be the first to know when nearby customers need your skills—get push notifications the second a job is posted.",
            icon: "BellPlus" // Lucide icon
        },
        {
            title: "Weekly Payouts",
            description: "No more waiting—receive your hard-earned money every week, reliably and automatically.",
            icon: "CreditCard" // Lucide icon
        },
        {
            title: "Smart Dashboard",
            description: "Manage requests, messages, and reviews all in one place with our intuitive, mobile-friendly dashboard.",
            icon: "LayoutDashboard" // Lucide icon
        },
        {
            title: "Flexible Scheduling",
            description: "You decide when and where you work—set your own hours and accept only the jobs that fit your calendar.",
            icon: "Clock" // Lucide icon
        },
        {
            title: "Local Reach",
            description: "Tap into your neighborhood—Servana prioritizes connecting you with customers in your nearby areas.",
            icon: "MapPin" // Lucide icon
        }
    ];

    return (
        <section id='provider-features' className='flex flex-col lg:flex-row items-center bg-amber-100 dark:bg-amber-950 p-6 lg:p-10 mb-[92px] lg:mb-[250px] rounded-4xl'>
            <div className='space-y-4 lg:space-y-12 mb-8 lg:mb-0'>
                <h2>List Your Services.<br />Get Discovered.<br />Get Paid.</h2>
                <p className='lg:w-[80%] lg:mb-16'>Servana puts your skills in front of the people who need them most — nearby customers ready to book and pay.</p>
                <Link to={'/auth?mode=register&role=provider'}><Button variant={'provider'} size={'lg'}>Become a Provider</Button></Link>
            </div>
            <div>
                {
                    providerFeatures.map((feature,index) => {
                        const Icon = Icons[feature.icon]
                        return (
                            <div key={index} className='flex gap-3'>
                                <Icon className='size-8' />
                                <div className='space-y-1 mb-5'>
                                    <h3 className='text-lg'>{feature.title}</h3>
                                    <p className='text-sm'>{feature.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default CoreFeaturesForProviders