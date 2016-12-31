import Joi from 'joi';

export const create = {
  name: Joi.string().required(),
  address: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  uen: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()),
};

export const update = {
  name: Joi.string().required(),
  address: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  uen: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()),
};

export default {
  create,
  update,
};
