const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ first_name, last_name, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/songs');
    } catch (error) {
        res.status(400).render('register', { errorMessage: error.message });
    }   
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
                    res.cookie('token', token, { httpOnly: true });
                    res.redirect('/songs');
                } else {
                    res.status(401).render('login', { errorMessage: 'Invalid password' });
                }
            }
        else {
            res.status(401).render('login', { errorMessage: 'Invalid email or password' });
        }   
    } catch (error) {
        res.status(500).render('login', { errorMessage: error.message });
    }
};


