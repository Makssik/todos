const express = require('express');
const router = express.Router();
const { regController, loginController, getUsers } = require('../controllers/authController');
const { regValidation, loginValidation } = require('../middlewares/validationMiddleware')
const {authMiddleware} = require('../middlewares/authMiddleware');
const { asyncWrapper } = require('../helpers/asyncWrapper')

router.post('/reg', regValidation, asyncWrapper(regController))
router.post('/login', loginValidation, asyncWrapper(loginController))
router.get('/users', authMiddleware, getUsers)

module.exports = {authRouter: router}