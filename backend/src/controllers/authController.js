// authController

const User = require('../models/User');
const { registerUser, loginUser, updateUser } = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const user = await registerUser(req.body.name, req.body.email, req.body.password);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user.id;
        const {name, email, phoneNumber} = req.body;
        const userUpdate = await updateUser(userId, name, email, phoneNumber);
        res.status(200).json({message: "User update successfully", user: userUpdate.user, token: userUpdate.token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.profile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if(!user){
           return res.status(404).json({error: "User not found"});
        } 
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

