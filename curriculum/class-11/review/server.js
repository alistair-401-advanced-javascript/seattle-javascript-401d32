'use strict';

/**
 * API Server Module
 * @module src/app
 */

const cwd = process.cwd();

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
// const errorHandler = require(`${cwd}/src/middleware/500.js`);
// const notFound = require(`${cwd}/src/middleware/404.js`);
const v1Router = require(`${cwd}/api.js`);
const graphqlHandler = require(`${cwd}/graphql.js`);
// const swagger = require(`${cwd}/src/api/swagger.js`);

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Routes
// app.use('/docs', express.static('docs'));

// Routes
app.use(v1Router);
app.use('/graphql', graphqlHandler);

// Catchalls
// app.use(notFound);
// app.use(errorHandler);

/**
 * Start Server on specified port
 * @param port {integer} (defaults to process.env.PORT)
 */
let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });
};

module.exports = { app, start };