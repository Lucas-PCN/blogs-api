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

module.exports = {
  createPost,
  getAll,
};