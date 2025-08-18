const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
router.post('/register',async (req ,res)=>{
    try{
        const{username, email, password} = req.body;

        const existingUser = await User.findOne({ email});
        if (existingUser) return res.status(400).json({message: 'User already exist'});

        const user = new User({ username, email, password});
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
        }
    });
  
// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  };
});

module.exports = router;


    