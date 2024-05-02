// Import the userModel correctly
const userModel = require('../models/userModels');
const bcrypt =require('bcrypt')

// Create the createUser function
const createUser = async (req, res) => {
    // Destructure the data from req.body
    const { firstName, lastName, email, password } = req.body;

    // Data Validation
    if (!firstName || !lastName || !email || !password) {
        return res.json({
            "success": false,
            "message": "Please Enter all fields"
        });
    }

    // Error handling using try...catch
    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User already exists"
            });
        }
 //Hash the passowrd
    const randomSalt=await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,randomSalt)
    

        // Create a new user if not exists
        const newUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });

        // Save the new user
        await newUser.save();

        // Send success response
        return res.json({
            "success": true,
            "message": "User Successfully Created"
        });

    } catch (error) {
        // Log the error and send internal server error response
        console.log(error);
        return res.json({
            "success": false,
            "message": "Internal Server Error"
        });
    }
};

// Export the function
module.exports = {
    createUser,
};
