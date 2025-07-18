import { useState } from "react";
import {
  Home,
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  Car,
  TreePine,
  Shield,
  Filter,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const categories = [
  {
    id: "home-services",
    name: "Home Services",
    icon: Home,
    subcategories: [
      "House Cleaning",
      "Carpet Cleaning",
      "Window Cleaning",
      "Deep Cleaning",
      "Move-in/Move-out Cleaning",
    ],
  },
  {
    id: "repairs",
    name: "Repairs & Maintenance",
    icon: Wrench,
    subcategories: [
      "Appliance Repair",
      "HVAC Repair",
      "General Handyman",
      "Furniture Assembly",
      "TV Mounting",
    ],
  },
  {
    id: "painting",
    name: "Painting",
    icon: Paintbrush,
    subcategories: [
      "Interior Painting",
      "Exterior Painting",
      "Cabinet Painting",
      "Pressure Washing",
      "Wallpaper Installation",
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    subcategories: [
      "Electrical Repair",
      "Light Installation",
      "Outlet Installation",
      "Ceiling Fan Installation",
      "Smart Home Setup",
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Droplets,
    subcategories: [
      "Leak Repair",
      "Drain Cleaning",
      "Faucet Installation",
      "Toilet Repair",
      "Water Heater Service",
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    subcategories: [
      "Car Wash",
      "Oil Change",
      "Tire Service",
      "Auto Detailing",
      "Mobile Mechanic",
    ],
  },
  {
    id: "landscaping",
    name: "Landscaping",
    icon: TreePine,
    subcategories: [
      "Lawn Mowing",
      "Tree Trimming",
      "Garden Design",
      "Irrigation",
      "Seasonal Cleanup",
    ],
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    subcategories: [
      "Security System Installation",
      "Camera Setup",
      "Lock Installation",
      "Alarm Monitoring",
      "Access Control",
    ],
  },
];

function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSelectedCategory("")
  };

  return (
    <Card className="w-full max-w-[280px] bg-background border-teal-100 gap-1 pt-3">
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900 m-0">Categories</h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 px-3">
        {/* All Categories Button */}
        <Button
          variant={"outline2"}
          className={`w-full justify-start rounded-full h-12 ${
            selectedCategory === "all"
              ? "bg-primary text-white"
              : "bg-teal-50 border-gray-300 text-gray-700"
          }`}
          onClick={() => handleCategorySelect("all")}
        >
          All
        </Button>

        {/* Category Accordion */}
        <Accordion type="single" collapsible className=" w-[255px] space-y-1">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <AccordionItem key={category.id} value={category.id} className="border-none">
                <AccordionTrigger
                  className={`flex items-center text-sm justify-between w-full px-4 py-1.5 text-left rounded-full hover:no-underline transition-colors ${
                    isSelected
                      ? "bg-teal-100 text-gray-900"
                      : "bg-teal-50 border border-gray-200 text-gray-700 hover:bg-teal-100"
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-0">
                  <div className="space-y-1 mx-1 ml-3">
                    {category.subcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        variant="outline2"
                        className={`w-full justify-start text-sm h-9 rounded-full border-transparent ${
                          selectedSubcategory === subcategory
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
