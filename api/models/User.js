const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', User)