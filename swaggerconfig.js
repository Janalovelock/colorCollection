const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Color Collection',
    description: 'A collection of color palettes for digital designers',
  },
  host: 'localhost:3000', // Update with your host and port
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './routes/index.js',


]; // Update with the path to your routes file(s)

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); // Update with the path to your server file
});