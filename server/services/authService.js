const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../db/userModel');
const { Role } = require('../db/roleModel');

const registration = async (email, password) => {
    const hashPassword = bcrypt.hashSync(password, 8)
    const userRole = await Role.findOne({value: "USER"})
    const user = new User({ email, password: hashPassword, roles: [userRole.value] });
    await user.save();
};
const login = async (email, password) => {
    try {
        const {id, roles} = await User.findOne({ email })
        const payload = { id, roles }
        const token = jwt.sign(payload, process.env.SECRET)
        return token
    } catch (err) {
        console.log(err);
    }
};

module.exports = {registration, login}