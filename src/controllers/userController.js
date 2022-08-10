const UserService = require('../services/userService');

const getToken = async (req, res) => {
  const { email, password } = req.body;

  const token = UserService.generateToken(email, password);

  res.status(200).json({ token });
};

module.exports = {
  getToken,
};