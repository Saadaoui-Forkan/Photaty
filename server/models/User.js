const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    status: {
        type: String,
      },
      bio: {
        type: String,
      },
      avatar: {
        type: String,
      },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = User = mongoose.model('user', UserSchema)