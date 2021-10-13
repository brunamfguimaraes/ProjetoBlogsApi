const jwt = require('jsonwebtoken');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

const postUserController = async (req, res, next) => { 
  const { displayName, email, password, image } = req.body;
  
  const errorOnPostUser = await postUserService(displayName, email, password, image);
  if (errorOnPostUser) {
    return next(errorOnPostUser);
  }

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({}, process.env.JWT_SECRET, jwtConfig);

  res.status(StatusCodes.CREATED).json({ token });
};

const getUsersController = async (req, res, next) => { 
  try {
    const { authorization } = req.headers;

    return res.status(StatusCodes.OK).json(allUsers);
    
    jwt.verify(authorization, process.env.JWT_SECRET);
    
    const allUsers = await getUsersService();
  
    return res.status(200).json(allUsers);
  } catch (_err) {
      return next({ code: 'UNAUTHORIZED', message: 'Expired or invalid token' });
  }
  return res.status(StatusCodes.OK).json(user);
};

module.exports = { postUserController, getUsersController };
