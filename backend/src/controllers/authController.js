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
    const userId = req.user.id;
    const {name} = req.body;
    try {
        const updateUser = await updateUserName(userId, name);
        res.json({message: "Username updated Successfully", user: updateUser})
    } catch (error) {
        res.status(500).json({message: "Error to update name"});
    }
} 
