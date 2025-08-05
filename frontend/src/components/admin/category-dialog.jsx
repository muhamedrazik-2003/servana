import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AddNewCategory, updateCategory } from "../../redux/slices/categorySlice"
import { toast } from "sonner"
import { useDispatch } from "react-redux"

export function CategoryDialog({
  category,
  isSubcategory,
  trigger
}) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: category?.title || "", subCategory: category?.subCategories.join(",") || ""
  })
  const [newSubCategory, setNewSubCategory] = useState('')

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    try {
      const subCategories = data.subCategory.split(',').map(item => item.trim());
      const newData = { title: data.title, subCategories }
      console.log("newData", newData)
      if (category) {
        const categoryId = category._id
        const response = await dispatch(updateCategory({ categoryId, newData }));
        if (updateCategory.fulfilled.match(response)) {
          toast.success("Category contents Updated successfully!");
          // navigate('/provider/services');
          setOpen(false)
          setData({
            title: "", subCategory: ""
          })
          return;
        } else if (updateCategory.rejected.match(response)) {
          return toast.error(response.payload?.message || "Something went wrong while updating Category contents");

        }
        return
      } else {
        const response = await dispatch(AddNewCategory(newData));
        if (AddNewCategory.fulfilled.match(response)) {
          toast.success("Category contents Added successfully!");
          // navigate('/provider/services');
          setOpen(false)
          setData({
            title: "", subCategory: ""
          })
          return;
        } else if (AddNewCategory.rejected.match(response)) {
          return toast.error(response.payload?.message || "Something went wrong while Adding Category contents");

        }
      }

    } catch (error) {
      console.error("submission error:", error);
      toast.error("An unexpected error occurred");
    }

  }

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault()
    try {

      const categoryId = category._id
      const updatedSubCategories = [...(category?.subCategories || []), newSubCategory.trim()];


      console.log("updatedSubCategory", updatedSubCategories)
      const newData = { title: category.title, subCategories: updatedSubCategories }
      console.log("newData", newData)

      const response = await dispatch(updateCategory({ categoryId, newData }));
      if (updateCategory.fulfilled.match(response)) {
        toast.success("subCategory Added Successfully");
        setOpen(false)
        return;
      } else if (updateCategory.rejected.match(response)) {
        return toast.error(response.payload?.message || "Something went wrong while Adding Subcategory");

      }

    } catch (error) {
      console.error("submission error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {isSubcategory
            ? <DialogTitle>Add New Sub Category</DialogTitle>
            : <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
          }
        </DialogHeader>
        {isSubcategory
          ?
          <form onSubmit={handleSubCategorySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sub-category-name">Sub Category Name</Label>
              <Input
                id="sub-category-name"
                onChange={(e) => setNewSubCategory(e.target.value)}
                placeholder="Enter sub category name"
                required />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Sub Category</Button>
            </div>
          </form>
          : <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={category?.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Enter category name"
                required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description">Sub Categories <span className="text-sm text-orange-500">(Comma Seperated)</span></Label>
              <Textarea
                id="category-description"
                value={data.subCategory}
                onChange={(e) => setData({ ...data, subCategory: e.target.value })}
                placeholder="Enter subcategories (comma seperated)"
                rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{category ? "Update" : "Add"} Category</Button>
            </div>
          </form>
        }
      </DialogContent>
    </Dialog >
  );
}
