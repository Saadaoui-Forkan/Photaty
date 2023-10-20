const User = require('../models/User')
const {  validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register New User
const registerUser = async(req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, confirmPassword } = req.body

    try {
        // Check if user exist
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        // Check confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password Not Confirmed" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });

        await user.save();
        res.send({ msg: "success registration", data: user });
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error");  
    }
    
}

// Login
const loginUser = async(req,res) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        // Check if user registered
        if(!user) {
            return res.status(400).json({ message: "Invalid Credentials"})
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // Generate Token
        const payload = {
            user: {
                id: user.id,
                name: user.name
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err
            res.json({
                success: true,
                data: {
                    name: user.name,
                    token
                }
            })
        })

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error");  
    }
}

// Get Current User
const getCurrentUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -confirmPassword');
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error"); 
    }
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}