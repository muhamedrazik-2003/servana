import { Card, CardContent } from "@/components/ui/card"
import { CircleCheck, MapPin, Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { CardTitle } from "../../ui/card"

function TopProviderSection() {
    const topRatedProviders = [
        {
            id: 1,
            name: "Arun Tech Services",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            location: "Nadakkav, Calicut",
            rating: 4.9,
            service: "Laptop Repair",
            jobsCompleted: 130,
            verified: true
        },
        {
            id: 2,
            name: "CleanCo Experts",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            location: "Kozhikode",
            rating: 4.8,
            service: "Home Cleaning",
            jobsCompleted: 95,
            verified: true
        },
        {
            id: 3,
            name: "FixIt Electricians",
            image: "https://randomuser.me/api/portraits/men/65.jpg",
            location: "Online Support",
            rating: 4.7,
            service: "AC Repair",
            jobsCompleted: 110,
            verified: false
        },
        {
            id: 4,
            name: "Spark Beauty",
            image: "https://randomuser.me/api/portraits/women/21.jpg",
            location: "Calicut",
            rating: 5.0,
            service: "Facial & Wellness",
            jobsCompleted: 78,
            verified: true
        },
        {
            id: 5,
            name: "Bright Tutors",
            image: "https://randomuser.me/api/portraits/men/18.jpg",
            location: "Kozhikode",
            rating: 4.6,
            service: "Math & Science",
            jobsCompleted: 145,
            verified: true
        },
        {
            id: 6,
            name: "PetCare Pros",
            image: "https://randomuser.me/api/portraits/women/36.jpg",
            location: "Online",
            rating: 4.9,
            service: "Pet Grooming",
            jobsCompleted: 120,
            verified: false
        }
    ]

    return (
        <section className="mt-10 space-y-5 pb-30">
            <div>
                <h2 className='text-2xl md:text-4xl mb-1'>Best in Your Area</h2>
                <p className='text-base mb-10'>Providers with the most jobs completed and top feedback.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {topRatedProviders.map(provider => (
                    <Card key={provider.id} className=" relative grid grid-cols-2 gap-0 py-0 rounded-4xl border-0 border-slate-200 shadow-none hover:bg-amber-100 transition">
                        <div className="">
                            <img
                                src={provider.image}
                                alt={provider.title}
                                className="aspect-square h-full w-full object-cover rounded-4xl p-2"
                            />
                        </div>
                        <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm bg-accent text-white'}>top Rated</Badge>
                        <CardContent className="px-4 pb-6 pt-15">
                            <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">{provider.name}</h3>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <CircleCheck className="w-3.5 h-3.5" />
                                {provider.service}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5" />
                                {provider.location}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="w-3.5 h-3.5" />
                                {provider.jobsCompleted} Jobs Completed
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default TopProviderSection