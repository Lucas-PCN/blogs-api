const { Op } = require('sequelize');
const { BlogPost, Category, User, PostCategory } = require('../database/models');

const createPost = async (body, user) => {
  const findUser = await User.findOne({ where: { email: user.data.userInfo } });
  const { id } = findUser.dataValues;

  const create = await BlogPost.create({ ...body, userId: id });

  body.categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: create.id, categoryId });
  });

  return create;
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
    }],
  });

  return result;
};

const getIds = async () => {
  const ids = await BlogPost.findAll({
    attributes: ['id'],
    raw: true,
  });

  return ids.map((id) => id.id);
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    include: [{
      model: Category,
      as: 'categories',
    },
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
    where: {
      id,
    },
  });

  return post;
};

const findUserId = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user.id;
};

const updatePost = async (body, id) => {
  await BlogPost.update({ title: body.title, content: body.content }, { where: { id } });

  const getPost = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
    }],
  });

  return getPost;
};

const destroy = async (id) => {
  const removed = await BlogPost.destroy({ where: { id } });
  
  return removed;
};

const getByQuery = async (q) => {
  if (!q) return getAll();

  const getPostsByQuery = await BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
     },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] },
    },
  {
    model: Category, 
    as: 'categories',
    through: { attributes: { exclude: ['postId', 'categoryId'] } },
  }],
  });

  return getPostsByQuery;
};

module.exports = {
  createPost,
  getAll,
  getIds,
  getPostById,
  findUserId,
  updatePost,
  destroy,
  getByQuery,
};