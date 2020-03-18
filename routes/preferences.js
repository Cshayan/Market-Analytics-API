/* Route file to handle the preference route */

// Dependencies
const express = require('express');
const router = express.Router();
const PreferenceAndroid = require("../model/Preference");
const nodemailer = require("nodemailer");
const {
  google
} = require("googleapis");

// Controller methods
const {
    getPreferenceByEmail
} = require('../controller/preferences');

// Route to controller methods
router.route('/').post(getPreferenceByEmail);


// Export the router
module.exports = router;