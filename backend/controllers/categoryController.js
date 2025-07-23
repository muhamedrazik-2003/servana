const categories = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categoriesList = await categories.find();
    res.status(200).json({ message: "Categories succesfully fetched", categoriesList });
  } catch (error) {
    res.status(404).json({ message: "Failed To retrieve Categories", error });
  }
};
exports.updateCategories = async (req,res) => {
try {
    const {title, icon, subCategories, categoryId} = req.body;
    const categoryData = await categories.findByIdAndUpdate(categoryId, {title,icon, subCategories},{new:true});
   if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", categoryData });
 } catch (error) {
    res.status(404).json({ message: "Failed To update Categories", error });
  }
}
