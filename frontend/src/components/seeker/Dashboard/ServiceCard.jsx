import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Star, UsersRound } from "lucide-react";
import { CardAction, CardDescription, CardTitle } from "../../ui/card";

const ServiceCard = ({ variant = "seeker" }) => {
    const data = {
        _id: 1234,
        name: " Ac Repair",
        description: "plumber with 10 years experience",
        providerName: "Ashokan",
        price: 2000,
        category: 'Home Services',
        location: "Calicut",
        image: "https://plus.unsplash.com/premium_photo-1677009541474-1fc2642943c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHwxfDB8fHww",
    }

    return (
        <Card className=" relative grid grid-cols-1 gap-0 py-0 rounded-3xl rounded-b-2xl shadow-none border-0 bg-background hover:bg-teal-100 transition">
            <Link to={`/services/detail`}>
                <div className="flex flex-col">
                    {/* Image */}
                    <div className="w-full md:h-auto">
                        <img
                            src={data.image || "/placeholder.jpg"}
                            alt={data.name}
                            className="aspect-square w-full h-auto object-cover rounded-3xl p-2"
                        />
                    </div>
                    <CardContent className="px-4 pt-0 pb-4 space-y-1">
                        <div className="flex items-center justify-between">
                            <CardTitle>{data.name}</CardTitle>
                            <CardAction>4⭐</CardAction>
                        </div>

                        <CardDescription className={'text-teal-600'}>{data.category}</CardDescription>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <UsersRound className="size-4" />
                                {data.providerName}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className=" flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="size-4" />
                                    {data.location}
                                </div>
                            </div>
                        </div>
                        <p className="text-primary text-sm font-semibold">Starting From ₹{data.price}</p>
                    </CardContent>
                </div>
            </Link>
        </Card>
    );
};

export default ServiceCard;
