const User = require('../models/User');
const { registerUser, loginUser, updateUser, deleteUser } = require('../services/authService');

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
        const {name, email, phoneNumber, bio} = req.body;
        const userUpdate = await updateUser(userId, name, email, phoneNumber, bio);
        res.status(200).json({message: "User update successfully", user: userUpdate.user, token: userUpdate.token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userid = req.user.id;
        const result = await deleteUser(userid);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
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

