const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const categoryController = require('./controllers/categoryController');
const categoryMiddleware = require('./middlewares/categoryMiddleware');
const postMiddleware = require('./middlewares/postMiddleware');
const postController = require('./controllers/postController');

const app = express();

app.use(express.json());

app.post('/login',
  userMiddleware.validateMissingFields,
  userMiddleware.validateUserFields,
  userController.getToken);

app.post('/user',
  userMiddleware.validateBodyInfos,
  userMiddleware.validateUserRegister,
  userController.create);

app.get('/user',
  userMiddleware.validateToken,
  userController.getAllUsers);

app.get('/user/:id',
  userMiddleware.validateToken,
  userMiddleware.validateId,
  userController.getByUserId);

app.post('/categories',
  userMiddleware.validateToken,
  categoryMiddleware.validateName,
  categoryController.createCategory);

app.get('/categories',
  userMiddleware.validateToken,
  categoryController.getAllCategories);

app.post('/post',
  userMiddleware.validateToken,
  postMiddleware.validateBodyInfos,
  postMiddleware.validateCategory,
  postController.createPost);

app.get('/post',
  userMiddleware.validateToken,
  postController.getAll);

app.get('/post/:id',
  userMiddleware.validateToken,
  postMiddleware.validateId,
  postController.getPostById);

app.put('/post/:id',
  userMiddleware.validateToken,
  postMiddleware.validateBodyUpdate,
  postMiddleware.validateUserAuth,
  postController.updatePost);

app.delete('/post/:id',
  userMiddleware.validateToken,
  postMiddleware.validateId,
  postMiddleware.validateUserAuthDestroy,
  postController.destroy);

module.exports = app;
