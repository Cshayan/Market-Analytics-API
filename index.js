// Install Dependencies
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

// Dependencies for security purposes
const mongoSantize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');


// Route files
const preferencesRoute = require('./routes/preferences');

// Config file
dotenv.config({
    path: './config/config.env'
});

// Database file
const connectDB = require('./config/db');

// Connect to database
connectDB(); 

// Body Parser Middleware
app.use(express.json());
// CORS middleware
app.use(cors());

/** Middleware for extra Security Purposes starts here **/

// Mongo Sanitize data
app.use(mongoSantize());

// Set Security Headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent HTTP Param pollution
app.use(hpp());

/** Middleware for extra Security Purposes ends here **/

// Route settings
app.get('/', (req, res, next) => {
    res.send('Working Fine');
    next();
});
app.use('/api/v1/getpreference', preferencesRoute);

// Listen to server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
