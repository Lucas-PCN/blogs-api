const postService = require('../services/postService');

const createPost = async (req, res) => {
  const result = await postService.createPost(req.body, req.user);

  res.status(201).json(result);
};

module.exports = {
  createPost,
};