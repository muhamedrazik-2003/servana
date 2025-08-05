"use client";
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SubcategoryDialog({
  subcategory,
  onSave,
  trigger
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(subcategory?.name || "")
  const [description, setDescription] = useState(subcategory?.description || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSave({ name: name.trim(), description: description.trim() })
      setOpen(false)
      if (!subcategory) {
        setName("")
        setDescription("")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{subcategory ? "Edit Subcategory" : "Add New Subcategory"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subcategory-name">Subcategory Name</Label>
            <Input
              id="subcategory-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter subcategory name"
              required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory-description">Description (Optional)</Label>
            <Textarea
              id="subcategory-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter subcategory description"
              rows={3} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{subcategory ? "Update" : "Add"} Subcategory</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
