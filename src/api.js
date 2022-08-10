const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

const app = express();

app.use(express.json());

app.post('/login',
  userMiddleware.validateMissingFields,
  userMiddleware.validateUserFields,
  userController.getToken);

module.exports = app;
