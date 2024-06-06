// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./db/connect'); // Import connectDb function
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET, // Provide a secret option
    resave: false,
    saveUninitialized: true,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const palettesRouter = require('./routes/palettes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/palettes', palettesRouter);

// Initialize MongoDB connection
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to DB and listening on ${PORT}`);
    });
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});
