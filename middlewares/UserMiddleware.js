const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { renderError } = require('../helper/renderError');

const TOKEN_ERROR_MSG = 'Expired or invalid token';

const validateIfFieldsExist = (body) => {
  const { error } = Joi.object({
    displayName: Joi.string().not().empty()
    .min(8)
    .required(),
    email: Joi.string()
    .email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string().required(),
  })
    .validate(body);
  if (error) {
  return renderError(error); 
  }
};

const validateIfLoginFieldsExist = (body) => {
  const { error } = Joi.object({
    email: Joi.string()
    .email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  })
    .validate(body);
  if (error) {
  return renderError(error); 
  }
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const segredo = process.env.JWT_SECRET;

  if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decoded = jwt.verify(token, segredo);
      const userWithoutPassword = {
          username: decoded.payload.email,
          role: decoded.payload.role,
          userId: decoded.payload.userId,
      };
        req.user = userWithoutPassword;
        console.log(req.user, 'decoded', decoded);

        next();
} catch (err) {
  return res.status(401).json({ message: TOKEN_ERROR_MSG });
}
};

module.exports = { validateIfFieldsExist, validateIfLoginFieldsExist, validateToken };