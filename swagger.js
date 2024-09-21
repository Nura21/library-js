const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specification version
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API documentation for the Library application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, // Adjust this if needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
