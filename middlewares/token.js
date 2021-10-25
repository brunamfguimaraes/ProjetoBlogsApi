const jwt = require('jsonwebtoken');

const haveToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401)
            .json({ message: 'Token not found' }); 
}
            
    next();
};

const validToken = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    haveToken,
    validToken,
};