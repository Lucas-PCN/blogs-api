const postService = require('../services/postService');

const createPost = async (req, res) => {
  const result = await postService.createPost(req.body, req.user);

  res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await postService.getAll();

  res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);

  res.status(200).json(post);
};

module.exports = {
  createPost,
  getAll,
  getPostById,
};