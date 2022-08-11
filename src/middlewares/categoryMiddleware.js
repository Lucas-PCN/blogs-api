const Joi = require('joi');

const validateName = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = {
  validateName,
};