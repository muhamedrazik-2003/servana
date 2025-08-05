import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button"
import { Plus, SquarePen, Trash2 } from "lucide-react"
import { useState } from "react"
import { updateCategory } from "../../redux/slices/categorySlice"

function CategoryAccordion({ categoryData }) {
    console.log(categoryData)
    const [data, setData] = useState(categoryData)
    const categoryLimit1 = Math.ceil(categoryData.length / 3)
    const categoryLimit2 = categoryLimit1 * 2

    const handleUpdateCategory = async (categoryId) => {
        try {
            console.log(data)
            // // const response = await dispatch(updateCategory({categoryId,data}));
            // if (deleteService.fulfilled.match(response)) {
            //     toast.success("Service Delete successfully!");
            //     navigate('/provider/services');
            //     return;
            // } else if (deleteService.rejected.match(response)) {
            //     return toast.error(response.payload?.message || "Something went wrong while Deleting the service");

            // }
        } catch (error) {
            console.error("submission error:", error);
            toast.error("An unexpected error occurred");
        }

    }
    return (
        <div className="grid grid-cols-3 gap-4">
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                {data?.slice(0, categoryLimit1).map((category, index) => (
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className='font-bold'>{category.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col  gap-2 text-balance">
                            <div className="flex items-center justify-end gap-3 px-1">
                                <Plus className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                <Trash2 className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                            </div>

                            {category.subCategories.map(subCategory => (
                                <div className="p-2 border rounded-md border-violet-300 flex justify-between items-center">
                                    <p className="">{subCategory}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                        <Trash2 className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                                    </div>
                                </div>
                            ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                {categoryData?.slice(categoryLimit1, categoryLimit2).map((category, index) => (
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className='font-bold'>{category.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col  gap-2 text-balance">
                            <div className="flex items-center justify-end gap-3 px-1">
                                <Plus className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                <Trash2 className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                            </div>
                            {category.subCategories.map(subCategory => (
                                <div className="p-2 border rounded-md border-violet-300 flex justify-between items-center">
                                    <p className="">{subCategory}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                        <Trash2 className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                                    </div>
                                </div>
                            ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                {categoryData?.slice(categoryLimit2).map((category, index) => (
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className='font-bold'>{category.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col  gap-2 text-balance">
                            <div className="flex items-center justify-end gap-3 px-1">
                                <Plus className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                <Trash2 className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                            </div>
                            {category.subCategories.map(subCategory => (
                                <div className="p-2 border rounded-md border-violet-300 flex justify-between items-center">
                                    <p className="">{subCategory}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />
                                        <Trash2 className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                                    </div>
                                </div>
                            ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default CategoryAccordion;