const categories = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categoriesList = await categories.find();
    res
      .status(200)
      .json({ message: "Categories succesfully fetched", categoriesList });
  } catch (error) {
    res.status(404).json({ message: "Failed To retrieve Categories", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { title, subCategories } = req.body;
    console.log("id", categoryId);
    console.log("body", req.body);
    const categoryData = await categories.findByIdAndUpdate(
      categoryId,
      { title, subCategories },
      { new: true }
    );
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", categoryData });
  } catch (error) {
    res.status(404).json({ message: "Failed To update Categories", error });
  }
};

exports.AddCategory = async (req, res) => {
  try {
    const { title, subCategories } = req.body;
    console.log("Body received:", req.body);

    if (!title || !subCategories) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const newCategory = new categories({
      title,
      subCategories,
      pendingSubCategories : []
    })
    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category Added Succesfully",
      newCategoryData: savedCategory,
    });
  } catch (error) {
    res.status(404).json({ message: "Failed To add Category", error });
  }
};

exports.deletCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryData = await categories.findByIdAndDelete(categoryId);
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category Deleted Successfully", deletedData: categoryData });
  } catch (error) {
    res.status(404).json({ message: "Failed To delete Categories", error });
  }
};