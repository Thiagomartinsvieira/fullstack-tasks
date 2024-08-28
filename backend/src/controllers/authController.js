const {registerUser, loginUser} = require('../services/authService')

exports.register = async (req, res) => {
    try {
        const user = await registerUser(req.body.email, req.body.password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

exports.login = async (req, res) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}