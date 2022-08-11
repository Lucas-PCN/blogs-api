const CategoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const name = req.body;

  const category = await CategoryService.createCategory(name);

  res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await CategoryService.getAll();

  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};