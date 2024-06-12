const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const { getDb } = require('../db/connect'); // Import the getDb function
const { ObjectId } = require('mongodb');



exports.loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.registerUser = async (req, res) => {
    const { name, email, password, accountType } = req.body; // Include accountType from request body
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            accountType // Add accountType to user object
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If everything is okay, log in the user
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: 'User logged in successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.logoutUser = (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: 'User logged out successfully' });
    });
};
exports.updateCredentials = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    try {
        // Find the logged-in user
        const user = req.user;

        // If a new username is provided, update it
        if (username) {
            user.name = username;
        }

        // If a new password is provided, update it
        if (newPassword) {
            // Verify the current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update the password
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Credentials updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const db = getDb();
        const usersCollection = db.collection('users');
        
        // Check if the user exists
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await usersCollection.deleteOne({ _id: new ObjectId(userId) });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};