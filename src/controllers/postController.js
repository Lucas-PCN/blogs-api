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

const updatePost = async (req, res) => {
  const { id } = req.params;

  const result = await postService.updatePost(req.body, id);

  res.status(200).json(result);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const result = await postService.destroy(id);

  res.status(204).json(result);
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const result = await postService.getByQuery(q);

  res.status(200).json(result);
};

module.exports = {
  createPost,
  getAll,
  getPostById,
  updatePost,
  destroy,
  getByQuery,
};