const userModel = require('../models/userModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET);
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" })
        const token = createToken(user._id)
        res.status(200).json({ message: "Login Successfull", token })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })

    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already Exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email!" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be 8 characters at least" })
        }
        const hashedPass = await bcrypt.hash(String(password), 10);
        const user = await userModel.create({ name, email, password: hashedPass });
        const token = createToken(user._id);
        res.status(201).json({ message: "User created successfully", token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { loginUser, registerUser }