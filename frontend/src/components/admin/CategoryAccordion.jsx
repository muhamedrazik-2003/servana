import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Loader2, Plus, SquarePen, Trash2 } from "lucide-react"
import { useState } from "react"
import { deleteCategory, updateCategory } from "../../redux/slices/categorySlice"
import { CategoryDialog } from "./category-dialog"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

function CategoryAccordion({ categoryData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('')
    const dispatch = useDispatch()
    const { isDeleting } = useSelector(state => state.categorySlice)
    const categoryLimit1 = Math.ceil(categoryData.length / 3)
    const categoryLimit2 = categoryLimit1 * 2

    const handleCategoryDelete = async (categoryId) => {

        const response = await dispatch(deleteCategory(categoryId));
        if (deleteCategory.fulfilled.match(response)) {
            toast.success("Category deleted successfully!");
            setIsOpen(false)
            return;
        } else if (deleteCategory.rejected.match(response)) {
            return toast.error(response.payload?.message || "Something went wrong while Deleting Category");

        }
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                {categoryData?.slice(0, categoryLimit1).map((category, index) => (
                    <AccordionItem key={category._id} value={`item-${index}`}>
                        <div className="flex items-center justify-between">
                            <AccordionTrigger className='font-bold items-center justify-between'>
                                {category.title}
                            </AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <CategoryDialog
                                    category={category}
                                    trigger={<SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />}
                                />

                                <Trash2
                                    onClick={() => {
                                        setIsOpen(true)
                                        setCategoryId(category._id)
                                    }}
                                    className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                            </div>
                        </div>
                        <AccordionContent className="flex flex-col  gap-2 text-balance">
                            <div className="text-right">
                                <Button size='sm' variant='outline2'>
                                    <Plus className="size-4 text-primary" />
                                    Add Sub Category
                                </Button>
                            </div>
                            {category.subCategories.map(subCategory => (
                                <div className="p-2 border rounded-md border-violet-300 flex justify-between items-center">
                                    <p className="">{subCategory}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        {/* <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" /> */}
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
                    <AccordionItem key={category._id} value={`item-${index}`}>
                        <div className="flex items-center justify-between">
                            <AccordionTrigger className='font-bold items-center justify-between'>
                                {category.title}
                            </AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <CategoryDialog
                                    category={category}
                                    trigger={<SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />}
                                />
                                <Trash2
                                    onClick={() => {
                                        setIsOpen(true)
                                        setCategoryId(category._id)
                                    }}
                                    className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                            </div>
                        </div>
                        <AccordionContent className="flex flex-col  gap-2 text-balance">
                            <div className="text-right">
                                <Button size='sm' variant='outline2'>
                                    <Plus className="size-4 text-primary" />
                                    Add Sub Category
                                </Button>
                            </div>
                            {category.subCategories.map(subCategory => (
                                <div className="p-2 border rounded-md border-violet-300 flex justify-between items-center">
                                    <p className="">{subCategory}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        {/* <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" /> */}
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
                    <AccordionItem key={category._id} value={`item-${index}`}>
                        <div className="flex items-center justify-between">
                            <AccordionTrigger className='font-bold items-center justify-between'>
                                {category.title}
                            </AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <CategoryDialog
                                    category={category}
                                    trigger={<SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" />}
                                />
                                <Trash2
                                    onClick={() => {
                                        setIsOpen(true)
                                        setCategoryId(category._id)
                                    }}
                                    className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                            </div>
                        </div>
                        <AccordionContent className="flex flex-col  gap-2 text-balance pt-2">
                            <div className="text-right">
                                <Button size='sm' variant='outline2'>
                                    <Plus className="size-4 text-primary" />
                                    Add Sub Category
                                </Button>
                            </div>
                            {category.subCategories.map(subCategory => (
                                <div className="p-2 border rounded-md border-violet-300 flex justify-between items-center">
                                    <p className="">{subCategory}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        {/* <SquarePen className="size-8 rounded-full text-primary hover:text-violet-900 hover:bg-violet-200 p-1.5" /> */}
                                        <Trash2 onClick={() => {

                                        }} className="size-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-200 p-1.5" />
                                    </div>
                                </div>
                            ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={`rounded-2xl p-6`}>
                    <DialogTitle className='mb-1'>Are you sure you want to delete this Category?</DialogTitle>
                    <p className='mb-3  text-sm'>This action Cannot be undone.This will permanently delete This Category and Remove it from the server</p>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant={'outline2'}>Close</Button>
                        </DialogClose>
                        <Button
                            onClick={() => {
                                handleCategoryDelete(categoryId)
                            }}
                            variant="destructive" className="">{isDeleting ? <> <Loader2 className='size-4 animate-spin mr-2' /> Deleting Service</> : "Delete Service"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CategoryAccordion;