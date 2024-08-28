const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({error: 'Acess denied, no token provided' })

    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({error: 'Invalid token' });
    }
};

module.exports = authMiddleware;