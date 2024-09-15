import dotenv from 'dotenv';
import express from 'express';
import requestParseMiddleware from './middleware/requestParseMiddleware.js';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TO-DO: Serve static files of entire client dist folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../client/dist'));


// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(requestParseMiddleware)
// TO-DO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
