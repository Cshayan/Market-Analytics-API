/*
 Script for automatically importing or deleting data from DB
*/

// All Dependencies
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load ENV file
dotenv.config({
    path: './config/config.env'
});

// Load the models
const Preference = require('./model/Preference');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Read the JSON file
const preferencesData = JSON.parse(fs.readFileSync(`${__dirname}/_data/preferences.json`, 'utf-8'));

// Import data to DB
const immportData = async () => {
    try {
        await Preference.create(preferencesData);
        

        console.log('Data Imported successfully...');
        process.exit();
    } catch (error) {
        console.error(error);
    }
}

// Delete data from DB
const deleteData = async () => {
    try {
        await Preference.deleteMany();
        

        console.log('Data deleted successfully');
        process.exit();
    } catch (error) {
        console.error(error);
    }
}

/* Call the functions according to argument provided */
/* 
 -i stands for import
 -d stands for delete 
*/
if (process.argv[2] === '-i') {
    immportData();
} else if (process.argv[2] === '-d') {
    deleteData();
}