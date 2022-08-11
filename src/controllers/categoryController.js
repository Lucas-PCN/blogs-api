const CategoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const name = req.body;

  const category = await CategoryService.createCategory(name);

  res.status(201).json(category);
};

module.exports = {
  createCategory,
};