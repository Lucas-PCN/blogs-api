const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const validateMissingFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateUserFields = async (req, res, next) => {
  const { email, password } = req.body;

  const correctUser = await UserService.findUser(email, password);

  if (!correctUser) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

const validateBodyInfos = async (req, res, next) => {
  try {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
  
const validateUserRegister = async (req, res, next) => {
  const { email } = req.body;
  
  const allEmails = await UserService.getEmails();
  
  if (allEmails.includes(email)) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  next();
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const validateId = async (req, res, next) => {
  const { id } = req.params;

  const ids = await UserService.getIds();

  if (!ids.includes(Number(id))) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  next();
};

module.exports = {
  validateMissingFields,
  validateUserFields,
  validateBodyInfos,
  validateUserRegister,
  validateToken,
  validateId,
};