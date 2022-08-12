const CategoryService = require('../services/categoryService');

const validateBodyInfos = (req, res, next) => {
  const { categoryIds, title, content } = req.body;

  if (!categoryIds || !title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  const ids = await CategoryService.getIds();

  const isIdValid = categoryIds.map((categoryId) => ids.includes(categoryId)).includes(true);

  if (!isIdValid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = {
  validateBodyInfos,
  validateCategory,
};