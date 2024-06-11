const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser, loginValidation, updateCredentials } = require('../controllers/userController');
const auth = require('../middleware/auth');  
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/logout', logoutUser);
router.put('/update', auth, passport.authenticate('local'), updateCredentials);


// Initiate Google OAuth flow for registration
router.get('/google/register', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google OAuth registration
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            // Log that the callback route is being accessed
            console.log('Google OAuth callback route accessed');

            // If the user is already authenticated, proceed to dashboard
            if (req.isAuthenticated()) {
                console.log('User is already authenticated');
                return res.redirect('/');
            }
            
            // Extract user information from the OAuth profile
            const { id, displayName, emails } = req.user;

            // Check if the user already exists in the database
            let user = await User.findOne({ googleId: id });
            if (!user) {
                console.log('User not found in database. Creating new user...');
                // If the user doesn't exist, create a new user with Google credentials
                user = new User({
                    googleId: id,
                    name: displayName,
                    email: emails[0].value // Assuming the first email is primary
                });
                await user.save();
                console.log('New user created:', user);
            } else {
                console.log('User found in database:', user);
            }

            // Log in the user
            req.login(user, err => {
                if (err) {
                    console.error('Error logging in user:', err);
                    return res.redirect('/login'); // Redirect to login page on error
                }
                console.log('User logged in successfully');
                // Redirect to dashboard on successful registration/login
                res.redirect('/');
            });
        } catch (err) {
            console.error('Error registering user with Google OAuth:', err);
            res.redirect('/login'); // Redirect to login page on error
        }
    }
);

// Initiate Google OAuth flow for login
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;