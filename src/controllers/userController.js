const UserService = require('../services/userService');

const getToken = async (req, res) => {
  const { email } = req.body;

  const token = UserService.generateToken(email);

  res.status(200).json({ token });
};

const create = async (req, res) => {
  const user = req.body;
  const payload = {
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };

  const token = UserService.generateToken(payload);

  await UserService.create(user);

  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await UserService.getAllUsers();
  
  res.status(200).json(users);
};

module.exports = {
  getToken,
  create,
  getAllUsers,
};