const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

const registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: '1h' });

    return {
        user,
        token
    } 
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: '1h' });

    return token;
};


const updateUserName = async (email, newName) => {
 try {
    const user = await User.findOne({where: {email}});
    if(!user) {
        throw new Error("User not found!")
    }

    user.name = newName;
    await user.save();

    return user;
} catch (error) {
    throw error;   
 }
}

module.exports = {
    registerUser,
    loginUser,
    updateUserName,
};
