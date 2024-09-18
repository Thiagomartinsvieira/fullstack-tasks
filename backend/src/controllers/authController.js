// authController

const { registerUser, loginUser, updateUserName } = require('../services/authService');

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

exports.updateUserName = async (req, res) => {
    try {
        const userId = req.user.id;
        const newName = req.body.name;
        const updateUser = await updateUserName(userId, newName);
        res.status(200).json({message: "User name update successfully", user: updateUser.user, token: updateUser.token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
