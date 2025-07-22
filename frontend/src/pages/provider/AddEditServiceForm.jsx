import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import ProviderHeader from "../../components/provider/common/ProviderHeader";

function AddEditServiceForm() {
  const { pathname } = useLocation();
  let formFormat = "";
  if (pathname.includes('/new')) {
    formFormat = "addForm"
  } else if (pathname.includes('/update')) {
    formFormat = "updateForm"
  }

  return (
    <>
<ProviderHeader/>
      <div className="max-w-6xl mx-auto p-6 py-2 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-extrabold">{formFormat === "addForm" ? "Add New Service" : "Edit Your Service"}</h2>
          <Button className="px-6 bg-accent hover:bg-orange-500">Publish Service</Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-accent text-base font-semibold mb-3">Service Title</Label>
              <Input
                id="title"
                placeholder="Enter service title"
                className="rounded-3xl bg-orange-50 px-3 py-1 w-full"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-accent text-base font-semibold mb-3">Description</Label>
              <Textarea id="description" placeholder="Describe your service in detail..." rows={6} className="rounded-2xl bg-orange-50 px-3 py-1 w-full" />
            </div>

            {/* Category & Subcategory */}
            <div className="flex items-center gap-6">
              <div>
                <Label htmlFor="category" className="text-accent text-base font-semibold mb-3">Category</Label>
                <Select>
                  <SelectTrigger id="category" className="w-[200px] rounded-3xl bg-orange-50 px-3 py-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subcategory" className="text-accent text-base font-semibold mb-3">Subcategory</Label>
                <Select>
                  <SelectTrigger id="subcategory" className="w-[200px] rounded-3xl bg-orange-50 px-3 py-1">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deep-cleaning">Deep Cleaning</SelectItem>
                    <SelectItem value="pipe-repair">Pipe Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-accent text-base font-semibold mb-3">Price (₹)</Label>
              <Input id="price" type="number" placeholder="Enter price" className="rounded-3xl bg-orange-50 px-3 py-1 w-full" />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-accent text-base font-semibold mb-3">City</Label>
                <Input id="city" placeholder="Enter city" className="rounded-3xl bg-orange-50 px-3 py-1 w-full" />
              </div>
              <div>
                <Label htmlFor="state" className="text-accent text-base font-semibold mb-3">State</Label>
                <Input id="state" placeholder="Enter state" className="rounded-3xl bg-orange-50 px-3 py-1 w-full" />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-accent text-base font-semibold mb-3">Pincode</Label>
                <Input id="pincode" placeholder="Enter pincode" className="rounded-3xl bg-orange-50 px-3 py-1 w-full" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Images */}
            <div>
              <Label className="text-accent text-base font-semibold mb-4">Upload Images <span className="text-xs text-muted-foreground">( Upload up to 6 images )</span></Label>
              <p className="text-sm text-muted-foreground mt-2"></p>
              <div className="grid grid-cols-2 gap-2">
                {/* Image 1 */}
                <label htmlFor="serviceImg1" className="cursor-pointer">
                  <input type="file" name="serviceImg1" id="serviceImg1" className="hidden" />
                  <img src="" alt="" />
                  <div className="aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground bg-orange-100">
                    <ImagePlus className="text-accent" />
                  </div>
                </label>

                {/* Image 2 */}
                <label htmlFor="serviceImg2" className="cursor-pointer">
                  <input type="file" name="serviceImg2" id="serviceImg2" className="hidden" />
                  <img src="" alt="" />
                  <div className="aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground bg-orange-100">
                    <ImagePlus className="text-accent" />
                  </div>
                </label>

                {/* Image 3 */}
                <label htmlFor="serviceImg3" className="cursor-pointer">
                  <input type="file" name="serviceImg3" id="serviceImg3" className="hidden" />
                  <img src="" alt="" />
                  <div className="aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground bg-orange-100">
                    <ImagePlus className="text-accent" />
                  </div>
                </label>

                {/* Image 4 */}
                <label htmlFor="serviceImg4" className="cursor-pointer">
                  <input type="file" name="serviceImg4" id="serviceImg4" className="hidden" />
                  <img src="" alt="" />
                  <div className="aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground bg-orange-100">
                    <ImagePlus className="text-accent" />
                  </div>
                </label>

                {/* Image 5 */}
                <label htmlFor="serviceImg5" className="cursor-pointer">
                  <input type="file" name="serviceImg5" id="serviceImg5" className="hidden" />
                  <img src="" alt="" />
                  <div className="aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground bg-orange-100">
                    <ImagePlus className="text-accent" />
                  </div>
                </label>

                {/* Image 6 */}
                <label htmlFor="serviceImg6" className="cursor-pointer">
                  <input type="file" name="serviceImg6" id="serviceImg6" className="hidden" />
                  <img src="" alt="" />
                  <div className="aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground bg-orange-100">
                    <ImagePlus className="text-accent" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEditServiceForm;