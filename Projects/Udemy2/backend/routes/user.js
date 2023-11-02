const router = require("express").Router;
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

//register user

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }
        const hashed_passord = await bcrypt.hash(password, 10);
        user = new user({
            name,
            email,
            password: hashed_passord,
        });
        await user.save();
        return res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        console.log(err.message);
    }
});

//login user
router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        } );
        return res.json(token);
    } catch(err) {
        console.log(err.message);
    }
})


module.exports = router;