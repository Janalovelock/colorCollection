// server.js
const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); // Assuming you have a swagger_output.json file
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/', require('./routes/index'));

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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