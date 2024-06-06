// passport.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Email not registered' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (err) {
            console.error('Passport error:', err);
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {

        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {

            const user = await User.findById(id);
            console.log('Deserialized user:', user);
            done(null, user);
        } catch (err) {
            console.error('Passport error:', err);
            done(err);
        }
    });
};
