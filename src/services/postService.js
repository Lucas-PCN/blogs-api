const { BlogPost, User, PostCategory } = require('../database/models');

const createPost = async (body, user) => {
  const findUser = await User.findOne({ where: { email: user.email } });
  const { id } = findUser.dataValues;

  const create = await BlogPost.create({ ...body, userId: id });

  body.categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: create.id, categoryId });
  });

  return create;
};

module.exports = {
  createPost,
};