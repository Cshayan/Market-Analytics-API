/* Route file to handle the preference route */

// Dependencies
const express = require('express');
const router = express.Router();
const PreferenceAndroid = require("../model/Preference");
const nodemailer = require("nodemailer");
const {
  google
} = require("googleapis");

// // Controller methods
// const {
//     getPreferenceByEmail
// } = require('../controller/preferences');

// // Route to controller methods
// router.route('/').post(getPreferenceByEmail);

router.post('/', async (req, res, next) => {
    try {
        // get the data from the request
        const {
            email,
            name,
            os,
            battery,
            ram,
            backCamera,
            frontCamera,
            memory,
            priceRange,
            screenSize
        } = req.body;

        // if the os is android
        if (os === "android") {
            // search the Android Model
            const Info = await PreferenceAndroid.find({}).select(
                `os.android.battery.${battery} 
                     os.android.ram.${ram}
                     os.android.backCamera.${backCamera}
                     os.android.frontCamera.${frontCamera}
                     os.android.memory.${memory}
                     os.android.price.${priceRange}
                     os.android.screenSize.${screenSize}`
            );

            // send the email
            // sendEmail(
            //   {
            //     email,
            //     name,
            //     Info
            //   },
            //   {
            //     battery,
            //     ram,
            //     backCamera,
            //     frontCamera,
            //     memory,
            //     priceRange,
            //     screenSize
            //   },
            //   "android"
            // );
        } else if (os === "ios") {}

        // Send the response
        res.status(200).json({
            success: true,
            message: `Thank you for taking the survey! An email has been sent to ${email} with contains the list of some preferred mobile brands that the customer can opt for.`
        });
    } catch (error) {
        console.log(error);
    }
});

// Export the router
module.exports = router;