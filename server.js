// server.js
const express = require('express');
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
const indexRouter = require('./routes/index');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);

// Initialize MongoDB connection
mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      // Start the server
      app.listen(PORT, () => {
        console.log(`Connected to DB and listening on ${PORT}`);
      });
    }
});