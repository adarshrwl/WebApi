// Import the userModel correctly
const userModel = require('../models/userModels');
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')

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


//2 Login User function
const loginUser =async (req,res)=>{
    console.log(req.body)
    //destructuring
    const { email, password } = req.body;
    
    //validation 
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please provide email and password"
        });
    }


    try{
        // 1. find user,if [not] stop the process
        const user =await userModel.findOne({email:email})
        if(!user){
            return res.json({
                success:false,
                message:"User not found "
            });
        }
        // 2. compare the password,if not stop the process 
        const isValidPassword=await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.json({
                success:false,
                message:"Password is not matching"
            });
        }
        // 3. Generatae JWT token
        // 3.1. Srecet Dectyption key(.env)
        const token=await jwt.sign({id:user._id},
            process.env.JWT_SECRET
        )
        
        
        
        // 4. Send the token,UserData, Message to the user 
        res.json({
            "success":true,
            "message":"Login Successful",
            "Token":token,
            "userData":user
        })

    } catch(error){
        console.log(error)
        res.json({
            "success":false,
            "message":"Internal Server Error"
        })
    }
}


// Export the function
module.exports = {
    createUser,
    loginUser,
};
