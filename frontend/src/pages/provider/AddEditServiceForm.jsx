import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProviderHeader from "../../components/common/Provider&AdminHeader";
import { useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addService, updateServices } from "../../redux/slices/serviceSlice";
import { getCategories, getCurrentSubCategories } from "../../redux/slices/categorySlice";
import { toast } from "sonner";

function AddEditServiceForm() {
  // common
  const [showCustomSub, setShowCustomSub] = useState(false)
  const [priceUnit, setPriceUnit] = useState('hour')
  const [previews, setPreviews] = useState([])
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { serviceId } = useParams();

  useEffect(() => {
    dispatch(getCategories())
  }, [])
  let formFormat = "";
  let isAdmin = false;
  if (pathname.includes('/new')) {
    formFormat = "addForm"
  } else if (pathname.includes('/update')) {
    formFormat = "updateForm"
  }

  if (pathname.includes('/admin')) {
    isAdmin = true
  }
  // edit form
  const { categories, currentSubCategories } = useSelector(state => state.categorySlice);
  const { services, isUpdating, successResponse } = useSelector(state => state.serviceSlice);

  const currentService = services.find(service => service._id === serviceId);
  console.log(currentService)
  const navigate = useNavigate();
  const [serviceImages, setServiceImages] = useState(formFormat === "addForm" ?
    [] : [...currentService.images]
  )
  const user = JSON.parse(sessionStorage.getItem('user'));

  const [serviceData, setServiceData] = useState(formFormat === "addForm" ?
    {
      title: "",
      description: "",
      category: "",
      subCategory: "",
      price: "",
      priceUnit: "hour",
      location: {
        city: user?.location.city,
        state: user?.location.state,
        pincode: user?.location.pincode
      }
    }
    : { ...currentService }
  );

  const handleImageChange = (imageFile, index) => {
    if (!imageFile) return;

    const updatedImages = [...serviceImages];
    updatedImages[index] = imageFile;
    setServiceImages(updatedImages);

    const previewURL = URL.createObjectURL(imageFile);
    const updatedPreviews = [...previews];
    updatedPreviews[index] = previewURL;
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async () => {
    try {
      console.log(serviceData)
      if (!isAdmin) {
        if (user.phone === undefined || user.phone === "" || user.location.city === "Not Available" || user.location.state === "Not Available" || user.location.pincode === "Not Available") {
          return toast.error(
            <span>
              Please update at least your phone number and location to add new Service.{" "}
              <Link to="/provider/profile" className="underline text-blue-600 hover:text-blue-800">
                Go to Profile
              </Link>
            </span>
          );
        }
      }

      const { title, description, category, subCategory, price, priceUnit, location: { city, state, pincode } } = serviceData;
      if (!title || !description || !category || !subCategory || !price || !city || !priceUnit || !state || !pincode) return toast.warning("All fields Are required")

      if (formFormat === "addForm") {
        const hasImages = serviceImages.some(image => image !== undefined && image !== null);
        if (!hasImages) {
          return toast.warning("Please upload at least one image");
        }
      }

      const allowedTypes = [
        "image/jpeg", // .jpg, .jpeg
        "image/png",  // .png
        "image/webp", // .webp
        "image/avif"  // .avif
      ];
      let imageNotAllowed = false
      serviceImages.forEach(image => {
        if (typeof image !== "string" && !allowedTypes.includes(image?.type)) {
          imageNotAllowed = true;
        }
      })
      if (imageNotAllowed) {
        return toast.error("only .jpg, jpeg, png, webp and  avif type images are accepted");
      }

      console.log(serviceImages)
      const formData = new FormData();
      formData.append('title', serviceData.title);
      formData.append('description', serviceData.description);
      formData.append('category', serviceData.category);
      formData.append('subCategory', serviceData.subCategory);
      formData.append("price", serviceData.price);
      formData.append("priceUnit", serviceData.priceUnit);
      formData.append("city", serviceData.location.city);
      formData.append("state", serviceData.location.state);
      formData.append("pincode", serviceData.location.pincode);

      serviceImages.forEach(image => {
        if (image) {
          formData.append("images", image);
        }
      })
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      if (formFormat === "addForm") {
        const response = await dispatch(addService(formData));

        if (addService.fulfilled.match(response)) {
          toast.success("Service added successfully!")

          setServiceData({
            title: "",
            description: "",
            category: "",
            subCategory: "",
            price: "",
            priceUnit: "hour",
            location: {
              city: "",
              state: "",
              pincode: ""
            }
          });
          navigate(`/provider/services/${response.payload.service._id}`)
          setServiceImages([]);
          setPreviews([]);
          return;
        } else if (addService.rejected.match(response)) {
          return toast.error(response.payload?.message || "Something went wrong while adding the service");
        }
      } else {
        const response = await dispatch(updateServices({ serviceId, formData }));
        if (updateServices.fulfilled.match(response)) {
          toast.success("Service Updated successfully!")

          setServiceData({
            title: "",
            description: "",
            category: "",
            subCategory: "",
            price: "",
            priceUnit: "hour",
            location: {
              city: "",
              state: "",
              pincode: ""
            }
          });
          if (isAdmin) {
            navigate(`/admin/services/${serviceId}`)
          } else {
            navigate(`/provider/services/${serviceId}`)
          }
          setServiceImages([]);
          setPreviews([]);
          return;
        } else if (updateServices.rejected.match(response)) {
          return toast.error(response.payload?.message || "Something went wrong while Updating the service");
        }
      }

      console.log("Response:", response);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <>
      <ProviderHeader />
      <div className="max-w-6xl mx-auto p-6 pt-2 mb-15 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-extrabold">{formFormat === "addForm" ? "Add New Service" : "Edit Your Service"}</h2>
          {
            formFormat === "addForm"
              ? <Button onClick={handleSubmit} disabled={isUpdating} className={`px-6 ${isAdmin ? "bg-primary hover:bg-violet-500" : "bg-accent hover:bg-orange-500"}`}>{isUpdating ? "Adding Service" : "Publish Service"}</Button>
              : <Button onClick={handleSubmit} disabled={isUpdating} className={`px-6 ${isAdmin ? "bg-primary hover:bg-violet-500" : "bg-accent hover:bg-orange-500"}`}>{isUpdating ? "Updating Service" : "Update Service"}</Button>
          }
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title" className={`${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3`}>Service Title</Label>
              <Input
                id="title"
                value={serviceData.title}
                onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
                placeholder="Enter service title"
                className={`rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1 w-full`}
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className={` ${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3`}>Description</Label>
              <Textarea
                id="description"
                defaultValue={serviceData.description}
                onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                placeholder="Describe your service in detail..."
                rows={6}
                className={`rounded-2xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1 w-full`} />
            </div>

            {/* Category & Subcategory */}
            <div className="flex items-start gap-6">
              <div>
                <Label htmlFor="category" className={`${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3 `}>Category</Label>
                <Select
                  disabled={showCustomSub}
                  value={serviceData.category}
                  onValueChange={(value) => {
                    dispatch(getCurrentSubCategories(value))
                    setServiceData({ ...serviceData, category: value })
                  }}>
                  <SelectTrigger id="category" className={`w-[200px] rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem value={category.title}>{category.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory" className={`${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3`} >
                  Subcategory
                </Label>

                <Select
                  value={serviceData.subCategory}
                  disabled={showCustomSub || serviceData?.category?.length === 0}
                  onValueChange={(value) => setServiceData({ ...serviceData, subCategory: value })}>
                  <SelectTrigger className={`w-full rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1`}>
                    <SelectValue placeholder="Choose a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentSubCategories.map(category => (
                      <SelectItem value={category}>{category}</SelectItem>
                    ))}

                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground">
                  {showCustomSub === false && 'Can’t find your subcategory?'}
                  <button
                    type="button"
                    onClick={() => {
                      setServiceData({ ...serviceData, category: "Not Available", subCategory: 'Not Available' })
                      setShowCustomSub(prev => !prev)
                    }}
                    className={`${isAdmin ? "text-primary" : "text-accent"} font-medium underline`}
                  >
                    {showCustomSub ? "Add From Subcategory" : "Add a new one"}
                  </button>
                </div>

                {showCustomSub && (
                  <div className="pt-2">
                    <Input
                      type="text"
                      id="customSubcategory"
                      name="customSubcategory"
                      onChange={(e) => setServiceData({ ...serviceData, subCategory: e.target.value })}
                      placeholder="Enter new subcategory"
                      className={`rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1`}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We’ll review and add this subcategory if it meets our guidelines.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mt-4">
                <Label htmlFor="price" className={`text-base ${isAdmin ? "text-primary" : "text-accent"} font-semibold mb-1`}>
                  Price (₹)
                </Label>
                <div className={`w-fit ${isAdmin ? "bg-violet-200 dark:bg-violet-950" : "bg-orange-100 dark:bg-orange-950"} shadow-sm border rounded-full p-1 px-1 mb-1`}>
                  <div className="relative flex items-center text-[12px]">
                    <div
                      className={`absolute left-0 top-0 h-5.5 w-1/3 rounded-full ${isAdmin ? "bg-primary" : "bg-accent"} transition-all duration-300 ${priceUnit === 'hour'
                        ? 'translate-x-0'
                        : priceUnit === 'day'
                          ? 'translate-x-full'
                          : 'translate-x-[200%]'
                        }`}
                    ></div>
                    {['hour', 'day', 'service'].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => {
                          setServiceData({ ...serviceData, priceUnit: unit })
                          setPriceUnit(unit)
                        }}
                        className={`relative z-10 text-center w-20 py-0.5 px-2 rounded-full transition-colors duration-300 ${priceUnit === unit ? 'text-background' : 'text-foreground'
                          }`}
                      >
                        {unit === 'hour' ? 'Per/Hr' : unit === 'day' ? 'Per/Day' : 'Per/Service'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Input
                id="price"
                name="price"
                defaultValue={serviceData.price}
                onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                type="number"
                placeholder="Enter service price"
                className={`rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1 mt-1 w-full`}
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className={` ${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3`}>City</Label>
                <Input defaultValue={serviceData.location.city} onChange={(e) => setServiceData({ ...serviceData, location: { ...serviceData.location, city: e.target.value } })} id="city" placeholder="Enter city" className={`rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1 w-full`} />
              </div>
              <div>
                <Label htmlFor="state" className={`${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3`}>State</Label>
                <Input defaultValue={serviceData.location.state} onChange={(e) => setServiceData({ ...serviceData, location: { ...serviceData.location, state: e.target.value } })} id="state" placeholder="Enter state" className={`rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1 w-full`} />
              </div>
              <div>
                <Label htmlFor="pincode" className={`${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-3`}>Pincode</Label>
                <Input defaultValue={serviceData.location.pincode} onChange={(e) => setServiceData({ ...serviceData, location: { ...serviceData.location, pincode: e.target.value } })} id="pincode" placeholder="Enter pincode" className={`rounded-3xl ${isAdmin ? "bg-violet-50" : "bg-orange-50"} px-3 py-1 w-full`} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Images */}
            <div>
              <Label className={`${isAdmin ? "text-primary" : "text-accent"} text-base font-semibold mb-0 pb-0`}>Upload Images <span className="text-xs text-muted-foreground">( Upload up to 6 images )</span></Label>
              <p className="text-sm text-muted-foreground mt-2"></p>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <label htmlFor={`serviceImg${index}`} key={index} className="cursor-pointer">
                    <input
                      type="file"
                      id={`serviceImg${index}`}
                      name={`serviceImg${index}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files[0], index)}
                    />
                    {previews[index] || serviceData.images?.[index] ? (
                      <img
                        src={previews[index] || serviceData.images[index].url}
                        alt={`Preview ${index + 1}`}
                        className="aspect-video object-cover rounded-md"
                      />
                    ) : (
                      <div className={`aspect-video border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground ${isAdmin ? "bg-violet-300" : "bg-orange-100"}`}>
                        <ImagePlus className={`${isAdmin ? "text-primary" : "text-accent"}`} />
                      </div>
                    )}
                  </label>
                ))}
                <span className="text-xs text-red-500 col-span-2">* only .jpg, jpeg, png, webp and  avif type images are accepted</span>

              </div>

            </div>
          </div>
        </div>
      </div>
      {!isAdmin
        && <Footer userRole={'provider'} />
      }
    </>
  );
}

export default AddEditServiceForm;