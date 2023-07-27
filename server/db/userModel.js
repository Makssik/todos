const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
    }, 
    
    createdAt: {
        type: Date, 
        default: Date.now(),
    },
    
    userName: {
        type: String,
        default: 'unknown username',
    },

    roles: [{type: String, ref: 'Role'}]
});

const User = mongoose.model('User', userSchema);

module.exports = {User}