import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
const recommendedServices = [
    {
        id: 1,
        title: "AC Repair",
        image: "https://images.unsplash.com/photo-1619617826923-124ec2eb6c1b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEFpciUyMENvbmRpdGlvbiUyMHJlcGFpcmluZ3xlbnwwfDF8MHx8fDA%3D",
        location: "Calicut",
        providerCount: 12
    },
    {
        id: 2,
        title: "Home Cleaning",
        image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5lcnxlbnwwfDF8MHx8fDA%3D", // woman mopping home
        location: "Kozhikode",
        providerCount: 8
    },
    {
        id: 3,
        title: "Laptop Repair",
        image: "https://images.unsplash.com/photo-1721333089073-215a56fd710c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml4aW5nJTIwbGFwdG9wfGVufDB8MXwwfHx8MA%3D%3D", // tech support fixing laptop
        location: "Online Support",
        providerCount: 10
    },
    {
        title: "Pet Grooming",
        titleIcon: "PawPrint",
        image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0JTIwY2FyZXxlbnwwfDF8MHx8fDA%3D", // dog groomer at work
        providerCount: 8,
        location: "Online Support",

    },
    {
        title: "Car Repair",
        titleIcon: "Car",
        image: "https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww", // mechanic fixing car
        providerCount: 11,
        location: "Online Support",

    }
]

function RecommendedSection() {
    return (
        <section className="mt-10 space-y-5 pb-10">
            <div>
                <h2 className='text-2xl md:text-4xl mb-1'>Recommended for You</h2>
                <p className='text-base mb-10'>Services you may want to explore.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {recommendedServices.map(service => (
                    <Card key={service.id} className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="aspect-square h-full object-cover rounded-3xl p-2"
                        />
                        <Badge variant={'outline'} className={'mx-auto absolute top-5 right-5 md:text-sm'}>Recommended</Badge>
                        <CardContent className="px-4 pt-0 pb-6">
                            <h3 className="text-base font-medium text-gray-800 pt-2 pb-2">{service.title}</h3>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5" />
                                {service.location}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="w-3.5 h-3.5" />
                                {service.providerCount} providers available
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default RecommendedSection