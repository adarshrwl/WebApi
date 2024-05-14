// Import required modules

const bcrypt = require('bcrypt');
const userModel = require('../models/userModels');

// Create the login function
const login = async (req, res) => {
    // Destructure the email and password from req.body
    const { email, password } = req.body;

    // Data Validation
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please provide email and password"
        });
    }

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });

        // If user not found
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords don't match
        if (!isPasswordValid) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        // If email and password are correct, create and send JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        return res.json({
            success: true,
            message: "Login successful",
            token: token
        });

    } catch (error) {
        // Log the error and send internal server error response
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Export the function
module.exports = {
    login,
};
