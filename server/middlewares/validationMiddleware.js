const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { User } = require('../db/userModel');
const { notAuthorizedErr, validationErr } = require('../helpers/errors');

const schema = Joi.object({
  email: Joi.string().alphanum().min(3).max(15).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const regValidation = async (req, res, next) => {
    const { email, password } = req.body;
    
  const validationResult = schema.validate({ email, password });
    try {

        const candidat = await User.findOne({ email });
        if (candidat) {
            throw new notAuthorizedErr(
                `Пользователь с именем ${email} уже зарегистрирован`,
            );
        }

        if (validationResult.error) {
            console.error(validationResult.error);
            throw new validationErr('Проверьте входные данные', validationResult.error.details[0].message)
        }
        
        next();
    } catch (err) {
        next(err)
        // res.json({ message, status, description });
    }
};

const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {

        const candidat = await User.findOne({ email });
        if (!candidat) {
            throw new notAuthorizedErr(`Пользователь с именем ${email} не найден`)
        }

        const validPasssword = bcrypt.compareSync(password, candidat.password)
        if (!validPasssword) { 
            throw new notAuthorizedErr(`Password is wrong`)
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { regValidation, loginValidation };
