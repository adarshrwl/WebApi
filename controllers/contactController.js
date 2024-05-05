const contactModel = require('../models/contactModel')
const createContact = async (req, res) => {
    console.log(req.body)
    const{contactName,Email,phoneNumber}=req.body;

    if(!contactName||!Email||!phoneNumber){
        return res.json({
            "Success": false,
            "message": "please enter all fields!"
        })
    }
    try{
        const existingContact=await contactModel.findOne({phoneNumber:phoneNumber})
        if(existingContact){
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            })
        }
        const newContact=new contactModel({
            contactName:contactName,
            Email:Email,
            phoneNumber:phoneNumber
        })

        await newContact.save()

        res.json({
            "success": true,
            "message": "User Created Successfully"
        })

    }catch(error){
        console.log(error)
        res.json({
            "success": false,
            "message": "internal server error!"
        })
    }

}

module.exports={createContact}