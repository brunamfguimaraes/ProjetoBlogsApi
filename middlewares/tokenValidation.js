require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
        if (!token) { 
     return res.status(401).json({ message: 'Token not found' }); 
}
    const user = jwt.verify(token, secret);
       
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

    req.user = user;
  
    next();
  } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidation };
