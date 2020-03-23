const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    os: {
        type: Object,
        android: {
            battery: {
                "3000mAh": {
                    brand: {
                        type: [String]
                    }
                },
                "4000mAh": {
                    brand: {
                        type: [String]
                    }
                },
                "5000mAh": {
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