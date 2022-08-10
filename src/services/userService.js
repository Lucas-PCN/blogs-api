const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const findUser = async (userEmail, userPassword) => {
  const user = await User.findOne({
    where: {
      email: userEmail,
      password: userPassword,
    },
  });

  return user;
};

const generateToken = (userEmail, userPassword) => {
  const payload = {
    email: userEmail,
    password: userPassword,
  };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  
  return token;
};

module.exports = {
  findUser,
  generateToken,
};