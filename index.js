const express = require('express');
const app = express();
const dotenv = require('dotenv');

const preferencesRoute = require('./routes/preferences');

dotenv.config({
    path: './config/config.env'
});

const connectDB = require('./config/db');


connectDB();

app.use(express.json());

app.use('/api/v1', preferencesRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});