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

module.exports = {
  validateMissingFields,
  validateUserFields,
};