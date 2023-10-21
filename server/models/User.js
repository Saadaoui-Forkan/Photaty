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
        type: Object,
        default: {
          url: "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
          publicId: null,
        }
      },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = User = mongoose.model('user', UserSchema)