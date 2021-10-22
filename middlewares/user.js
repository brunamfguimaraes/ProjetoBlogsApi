const { jwtVerify } = require('./jwt');

const status401 = 401;
const status400 = 400;
// const status201 = 201;
// const status409 = 409;

const verifyDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(status400)
    .json({ message: '"displayName" length must be at least 8 characters long' }); 
}
next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email === '') {
    return res.status(status400).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(status400).json({ message: '"email" is required' });
  }
  if (!re.test(email)) {
 return res.status(status400).json({ message: '"email" must be a valid email' }); 
}
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password === '') {
    return res.status(status400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
  return res.status(status400).json({ message: '"password" is required' });
}
  if (password.length !== 6) {
    return res.status(status400).json(
  { message: '"password" length must be 6 characters long' },
    ); 
}
next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status401).json({ message: 'Token not found' });
  }
  const jwtResult = jwtVerify(token);
  if (jwtResult.message) {
    return res.status(status401).json({ message: 'Expired or invalid token' });
  }
  req.token = jwtResult;
  next();
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyToken,
};