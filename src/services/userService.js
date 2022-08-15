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

const generateToken = (userInfo) => {
  const payload = { data: { userInfo } };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  
  return token;
};

const getEmails = async () => {
  const emails = await User.findAll({
    attributes: ['email'],
    raw: true,
  });

  return emails.map((email) => email.email);
};

const create = async (user) => {
  const result = await User.create(user);
  
  return result;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    raw: true,
  });

  return users;
};

const getByUserId = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
    raw: true,
  });

  return user;
};

const getIds = async () => {
  const ids = await User.findAll({
    attributes: ['id'],
    raw: true,
  });

  return ids.map((id) => id.id);
};

const destroyMe = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  const userId = user.dataValues.id;

  const removed = await User.destroy({ where: { id: userId } });

  return removed;
};

module.exports = {
  findUser,
  generateToken,
  getEmails,
  create,
  getAllUsers,
  getByUserId,
  getIds,
  destroyMe,
};