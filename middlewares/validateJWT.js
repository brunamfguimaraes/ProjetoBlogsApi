const jwt = require('jsonwebtoken');

require('dotenv');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) { 
        return res.status(401).json({ message: 'missing auth token' }); 
}

    try {
        const payload = jwt.verify(token, secret);
        const { id } = payload.data;
        req.user = id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = validateJWT;
