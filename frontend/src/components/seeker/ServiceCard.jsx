import { Badge } from "@/components/ui/badge"
import { Users, UsersRound } from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

function ServiceCard({ format, category, Icon }) {
    return (
        <Link to={'/seeker/home/mybookings'} className={`${format === "seeker" ? "" : "pointer-events-none"}`}>
        <Card className={`shrink-0 p-0 relative transition-all duration-300 ${format === "seeker" ? "w-[300px] group" : "w-[320px]"}`}>
            <CardTitle className={`flex items-center justify-center gap-2 absolute bg-background py-2 px-4 rounded-4xl top-5 left-4 ${format === "seeker" ? "group-hover:bg-teal-100" : ""}`}>
                <Icon className={'size-5'} />
                {category.title}
            </CardTitle>
            <CardContent className={'p-0'}>
                <div className={`flex items-center justify-center gap-2 absolute bg-background py-2 px-4 rounded-4xl text-sm ${format === "seeker" ? "bottom-5 right-4 group-hover:bg-teal-100" : "hidden"} `}>
                    <UsersRound className={'size-4'} />
                    {category.providerCount} <span>Providers</span>
                </div>
                <img className={`object-cover w-full rounded-2xl ${format === "seeker" ? "h-[300px] w-auto" : "h-[500px]"}`} src={category.image} alt="" />
            </CardContent>
        </Card>
        </Link>
    )
}

export default ServiceCard