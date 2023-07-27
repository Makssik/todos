const { registration, login } = require('../services/authService');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { User } = require('../db/userModel');


const regController = async (req, res, next) => {
    const { email, password } = req.body;
    await registration(email, password)
    res.status(200).json({status: 'succes, new user has been created'})

}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password)
    res.status(200).json({status: 'succes login', token})
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json({text: 'your users', users})
    } catch (err) {
        next(err)
    }
}

module.exports = {regController, loginController, getUsers}