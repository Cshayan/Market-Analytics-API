// Install Dependencies
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

// Route files
const preferencesRoute = require('./routes/preferences');
const testRoute = require('./routes/test');

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

// Route settings
app.get('/', (req, res, next) => {
    res.send('Working Fine');
    next();
});
app.use('/api/v1/getpreference', preferencesRoute);
app.use('/api/v1/test', testRoute);

// Listen to server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});