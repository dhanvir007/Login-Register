const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
//@desc User Registeration
//@route /register 
//@access public
const userRegister = async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        if (!username || !email || !mobile || !password) {
            return res.status(404).json({ message: "All feilds are mandatory....!" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            mobile,
            password: hashPassword,
        })
        res.status(200).json(user);
        
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

//@desc User Login
//@rote /login
//@access public
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "All Feild are mandotary..!" })
        }
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            AccessToken = jwt.sign({
                name: user.username,
                id : user.id
            },process.env.ACCESS_TOKEN_SECERT ,
            {expiresIn : "1d"})
            res.status(200).json(AccessToken)
        } else {
            res.status(404).json({ message: "Username or Password id invalid" })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { userRegister, userLogin }