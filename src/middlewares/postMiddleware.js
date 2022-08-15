const CategoryService = require('../services/categoryService');
const PostService = require('../services/postService');

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

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const ids = await PostService.getIds();

  if (!ids.includes(Number(id))) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};

const validateUserAuth = async (req, res, next) => {
  const { id } = req.params;
  const email = req.user.data.userInfo;

  const findUserId = await PostService.findUserId(email);

  if (findUserId !== Number(id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

const validateBodyUpdate = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateUserAuthDestroy = async (req, res, next) => {
  const { id } = req.params;
  const email = req.user.data.userInfo;

  const getPostById = await PostService.getPostById(id);
  const idUser = getPostById.dataValues.userId;
  const findUserId = await PostService.findUserId(email);

  if (findUserId !== idUser) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = {
  validateBodyInfos,
  validateCategory,
  validateId,
  validateUserAuth,
  validateBodyUpdate,
  validateUserAuthDestroy,
};