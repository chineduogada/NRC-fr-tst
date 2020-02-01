import Joi from 'joi-browser';

export default {
  siteCode: Joi.string(),
  siteName: Joi.string(),
  address: Joi.string().allow('').optional()
};