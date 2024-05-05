// Import the Contact model
const contactModel = require('../models/contactModel');

// The createContact function
const createContact = async (req, res) => {
    console.log(req.body);
    const { contactName, Email, phoneNumber } = req.body;

    // Validate input fields
    if (!contactName || !Email || !phoneNumber) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        });
    }

    try {
        // Check if the contact already exists
        const existingContact = await contactModel.findOne({ phoneNumber: phoneNumber });
        if (existingContact) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            });
        }

        // Create a new contact
        const newContact = new contactModel({
            contactName,
            Email,
            phoneNumber
        });

        // Save the new contact to the database
        await newContact.save();

        res.json({
            "success": true,
            "message": "User Created Successfully"
        });

    } catch (error) {
        console.error('Error while creating contact:', error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error!",
            "error": error.message  // Detailed error message for diagnosis
        });
    }
};

// Export the function(s) to be used in other files
module.exports = { createContact };
