const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const categoryController = require('./controllers/categoryController');
const categoryMiddleware = require('./middlewares/categoryMiddleware');

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

module.exports = app;
