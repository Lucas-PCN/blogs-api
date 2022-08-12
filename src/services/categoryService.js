const { Category } = require('../database/models');

const createCategory = async (name) => {
  const category = await Category.create(name);

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getIds = async () => {
  const result = await Category.findAll({
    attributes: ['id'],
    raw: true,
  });

  return result.map((id) => id.id);
};

module.exports = {
  createCategory,
  getAll,
  getIds,
};