/* Route file to handle the preference route */

// Dependencies
const express = require('express');
const router = express.Router();

// Controller methods
const {
    getPreferenceByEmail
} = require('../controller/preferences');

// Route to controller methods
router.route('/').post(getPreferenceByEmail);

// Export the router
module.exports = router;