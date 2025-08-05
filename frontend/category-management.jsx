"use client";
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, FolderPlus } from "lucide-react"
import { CategoryDialog } from "./components/category-dialog"
import { SubcategoryDialog } from "./components/subcategory-dialog"
import { DeleteConfirmationDialog } from "./components/delete-confirmation-dialog"

export default function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Electronics",
      description: "Electronic devices and accessories",
      subcategories: [
        { id: "1-1", name: "Smartphones", description: "Mobile phones and accessories" },
        { id: "1-2", name: "Laptops", description: "Portable computers" },
        { id: "1-3", name: "Headphones", description: "Audio devices" },
      ],
    },
    {
      id: "2",
      name: "Clothing",
      description: "Fashion and apparel",
      subcategories: [
        { id: "2-1", name: "Men's Wear", description: "Clothing for men" },
        { id: "2-2", name: "Women's Wear", description: "Clothing for women" },
      ],
    },
    {
      id: "3",
      name: "Books",
      description: "Literature and educational materials",
      subcategories: [
        { id: "3-1", name: "Fiction", description: "Fictional literature" },
        { id: "3-2", name: "Non-Fiction", description: "Educational and factual books" },
        { id: "3-3", name: "Technical", description: "Programming and technical books" },
      ],
    },
  ])

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: generateId(),
      subcategories: [],
    }
    setCategories([...categories, newCategory])
  }

  const editCategory = (categoryId, categoryData) => {
    setCategories(
      categories.map((cat) => (cat.id === categoryId ? { ...cat, ...categoryData } : cat))
    )
  }

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const addSubcategory = (categoryId, subcategoryData) => {
    const newSubcategory = {
      ...subcategoryData,
      id: generateId(),
    }

    setCategories(categories.map((cat) =>
      cat.id === categoryId ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] } : cat))
  }

  const editSubcategory = (categoryId, subcategoryId, subcategoryData) => {
    setCategories(categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            subcategories: cat.subcategories.map((sub) =>
              sub.id === subcategoryId ? { ...sub, ...subcategoryData } : sub),
          }
        : cat))
  }

  const deleteSubcategory = (categoryId, subcategoryId) => {
    setCategories(categories.map((cat) =>
      cat.id === categoryId
        ? { ...cat, subcategories: cat.subcategories.filter((sub) => sub.id !== subcategoryId) }
        : cat))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground mt-1">Manage your categories and subcategories</p>
        </div>
        <CategoryDialog
          onSave={addCategory}
          trigger={
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          } />
      </div>
      {categories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first category</p>
            <CategoryDialog
              onSave={addCategory}
              trigger={
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Category
                </Button>
              } />
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-4">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border rounded-lg">
              <Card>
                <AccordionTrigger className="hover:no-underline p-0">
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 w-full">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant="secondary">{category.subcategories.length} subcategories</Badge>
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      onClick={(e) => e.stopPropagation()}>
                      <CategoryDialog
                        category={category}
                        onSave={(data) => editCategory(category.id, data)}
                        trigger={
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        } />
                      <DeleteConfirmationDialog
                        title="Delete Category"
                        description={`Are you sure you want to delete "${category.name}"? This will also delete all ${category.subcategories.length} subcategories. This action cannot be undone.`}
                        onConfirm={() => deleteCategory(category.id)}
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        } />
                    </div>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    {category.description && <p className="text-muted-foreground mb-4">{category.description}</p>}

                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Subcategories</h4>
                      <SubcategoryDialog
                        onSave={(data) => addSubcategory(category.id, data)}
                        trigger={
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Subcategory
                          </Button>
                        } />
                    </div>

                    {category.subcategories.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No subcategories yet</p>
                        <p className="text-sm">Add your first subcategory to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                            <div className="flex-1">
                              <h5 className="font-medium">{subcategory.name}</h5>
                              {subcategory.description && (
                                <p className="text-sm text-muted-foreground mt-1">{subcategory.description}</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <SubcategoryDialog
                                subcategory={subcategory}
                                onSave={(data) => editSubcategory(category.id, subcategory.id, data)}
                                trigger={
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                } />
                              <DeleteConfirmationDialog
                                title="Delete Subcategory"
                                description={`Are you sure you want to delete "${subcategory.name}"? This action cannot be undone.`}
                                onConfirm={() => deleteSubcategory(category.id, subcategory.id)}
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                } />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
