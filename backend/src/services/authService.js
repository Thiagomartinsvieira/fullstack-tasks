const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

const registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ name, email, password: hashedPassword });
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, name: user.name }, secret, { expiresIn: '1h' });

    return token;
};

module.exports = {
    registerUser,
    loginUser,
};
