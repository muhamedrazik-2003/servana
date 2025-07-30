import { useEffect, useState } from "react";
import * as Icon from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategoryBasedFilterData } from "../../../redux/slices/categorySlice";

// const categories = [
//     {
//         id: "home-services",
//         name: "Home Services",
//         icon: Home,
//         subcategories: [
//             "House Cleaning",
//             "Carpet Cleaning",
//             "Window Cleaning",
//             "Deep Cleaning",
//             "Move-in/Move-out Cleaning",
//         ],
//     },
//     {
//         id: "repairs",
//         name: "Repairs & Maintenance",
//         icon: Wrench,
//         subcategories: [
//             "Appliance Repair",
//             "HVAC Repair",
//             "General Handyman",
//             "Furniture Assembly",
//             "TV Mounting",
//         ],
//     },
//     {
//         id: "painting",
//         name: "Painting",
//         icon: Paintbrush,
//         subcategories: [
//             "Interior Painting",
//             "Exterior Painting",
//             "Cabinet Painting",
//             "Pressure Washing",
//             "Wallpaper Installation",
//         ],
//     },
//     {
//         id: "electrical",
//         name: "Electrical",
//         icon: Zap,
//         subcategories: [
//             "Electrical Repair",
//             "Light Installation",
//             "Outlet Installation",
//             "Ceiling Fan Installation",
//             "Smart Home Setup",
//         ],
//     },
//     {
//         id: "plumbing",
//         name: "Plumbing",
//         icon: Droplets,
//         subcategories: [
//             "Leak Repair",
//             "Drain Cleaning",
//             "Faucet Installation",
//             "Toilet Repair",
//             "Water Heater Service",
//         ],
//     },
//     {
//         id: "automotive",
//         name: "Automotive",
//         icon: Car,
//         subcategories: [
//             "Car Wash",
//             "Oil Change",
//             "Tire Service",
//             "Auto Detailing",
//             "Mobile Mechanic",
//         ],
//     },
//     {
//         id: "landscaping",
//         name: "Landscaping",
//         icon: TreePine,
//         subcategories: [
//             "Lawn Mowing",
//             "Tree Trimming",
//             "Garden Design",
//             "Irrigation",
//             "Seasonal Cleanup",
//         ],
//     },
//     {
//         id: "security",
//         name: "Security",
//         icon: Shield,
//         subcategories: [
//             "Security System Installation",
//             "Camera Setup",
//             "Lock Installation",
//             "Alarm Monitoring",
//             "Access Control",
//         ],
//     },
// ];

function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [categoryHidden, setCategoryHidden] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getCategories())
    },[])

    const {categories} = useSelector(state => state.categorySlice);
    
    const handleCategorySelect = (category) => {
        dispatch(getCategoryBasedFilterData(category));
        setSelectedCategory(category);
        setSelectedSubcategory("");
    };

    const handleSubcategorySelect = (subcategory) => {
        dispatch(getCategoryBasedFilterData(subcategory));
        setSelectedSubcategory(subcategory);
        setSelectedCategory("")
    };


    return (
        <Card className={` w-full lg:max-w-[280px] bg-background border-teal-100 lg:pt-3 transition-all duration-400 lg:rounded-3xl ${categoryHidden ? "gap-0 rounded-full" : "gap-1"}`}>
            <CardHeader className={`${categoryHidden ? "gap-0" : "gap-1"}`}>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-2 ">
                        <Icon.Filter className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg  font-semibold text-gray-900 m-0">Categories</h2>
                    </div>
                    <Icon.ChevronDown onClick={() =>setCategoryHidden(prev => !prev)} className="h-5 w-5 text-gray-600 lg:hidden" />
                </div>
            </CardHeader>

            <CardContent className={`space-y-2 px-3 lg:hidden ${categoryHidden ? "scale-y-0 h-0" : "scale-y-100"}`}>
                {/* All Categories Button */}
                <Button
                    variant={"outline2"}
                    className={`w-full justify-start rounded-full h-12 ${selectedCategory === "all"
                            ? "bg-primary text-white"
                            : "bg-teal-50 border-gray-300 text-gray-700"
                        }`}
                    onClick={() => handleCategorySelect("all")}
                >
                    All
                </Button>

                {/* Category Accordion */}
                <Accordion type="single" collapsible className="w-auto lg:w-[255px] space-y-1">
                    {categories.map((category) => {
                        const iconname = category?.icon;
                        // const IconComponent = Icon.iconname
                        const isSelected = selectedCategory === category?._id;

                        return (
                            <AccordionItem key={category?._id} value={category?._id} className="border-none">
                                <AccordionTrigger
                                    className={`flex items-center text-sm justify-between w-full px-4 py-1.5 text-left rounded-full hover:no-underline transition-colors ${isSelected
                                            ? "bg-teal-100 text-gray-900"
                                            : "bg-teal-50 border border-gray-200 text-gray-700 hover:bg-teal-100"
                                        }`}
                                    onClick={() => handleCategorySelect(category?.title)}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* <IconComponent className="h-4 w-4" /> */}
                                        <span className="font-medium">{category?.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-0">
                                    <div className="space-y-1 mx-1 ml-3">
                                        {category?.subCategories.map((subcategory) => (
                                            <Button
                                                key={subcategory}
                                                variant="outline2"
                                                className={`w-full justify-start text-sm h-9 rounded-full border-transparent ${selectedSubcategory === subcategory
                                                        ? "bg-primary text-background"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                                onClick={() => handleSubcategorySelect(subcategory)}
                                            >
                                                {subcategory}
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </CardContent>

            {/* for large screen */}
            <CardContent className={`space-y-2 px-3 hidden lg:block`}>
                {/* All Categories Button */}
                <Button
                    variant={"outline2"}
                    className={`w-full justify-start rounded-full h-12 ${selectedCategory === "all"
                            ? "bg-primary text-white"
                            : "bg-teal-50 border-gray-300 text-gray-700"
                        }`}
                    onClick={() => handleCategorySelect("all")}
                >
                    All
                </Button>

                {/* Category Accordion */}
                <Accordion type="single" collapsible className="w-auto lg:w-[255px] space-y-1">
                    {categories.map((category) => {
                        const IconComponent = category?.icon;
                        const isSelected = selectedCategory === category?._id;

                        return (
                            <AccordionItem key={category?._id} value={category?._id} className="border-none">
                                <AccordionTrigger
                                    className={`flex items-center text-sm justify-between w-full px-4 py-1.5 text-left rounded-full hover:no-underline transition-colors ${isSelected
                                            ? "bg-teal-100 text-gray-900"
                                            : "bg-teal-50 border border-gray-200 text-gray-700 hover:bg-teal-100"
                                        }`}
                                    onClick={() => handleCategorySelect(category?.title)}
                                >
                                    <div className="flex items-center gap-3">
                                        <IconComponent className="h-4 w-4" />
                                        <span className="font-medium">{category?.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-0">
                                    <div className="space-y-1 mx-1 ml-3">
                                        {category?.subCategories.map((subcategory) => (
                                            <Button
                                                key={subcategory}
                                                variant="outline2"
                                                className={`w-full justify-start text-sm h-9 rounded-full border-transparent ${selectedSubcategory === subcategory
                                                        ? "bg-primary text-background"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                                onClick={() => handleSubcategorySelect(subcategory)}
                                            >
                                                {subcategory}
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </CardContent>
        </Card>
    );
}

export default CategoryFilter;
