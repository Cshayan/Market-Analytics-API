const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    os: {
        type: Object,
        android: {
            battery: {
                maH3000: {
                    brand: {
                        type: [String]
                    }
                },
                maH4000: {
                    brand: {
                        type: [String]
                    }
                },
                maH5000: {
                    brand: {
                        type: [String]
                    }
                }
            }
        },
        "ios": {}
    }
});

module.exports = mongoose.model('Preference', PreferenceSchema);