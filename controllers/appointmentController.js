const appoinmentModel = require('../models/appoinmentModel')
const createAppoinment = async (req, res) => {
    console.log(req.body)
    const { date, time } = req.body;
    if (!date || !time) {
        return res.json({
            "Success": false,
            "message": "please enter all fields!"
        })
    }

    const appoinmentDate = new Date(date);
    const currentDate = new Date();

    if (isNaN(appoinmentDate.getTime()) || appoinmentDate < currentDate) {
        return res.json({
            "success": false,
            "message": "Invalid or past date provided!"
        });
    }

    if (time === "15:00") {
        return res.json({
            "success": false,
            "message": "Time slot at 15:00 is unavailable!"
        });
    }

    try {
        const existingAppoinment = await appoinmentModel.findOne({
            date: date,
            time: time
        })

        if (existingAppoinment) {
            return res.json({
                "success": false,
                "message": "User Already Exist!"
            });
        }

        const newAppoinment = new appoinmentModel({
            date: date,
            time: time
        })
        await newAppoinment.save();
        res.json({
            "success": true,
            "message": "User Created Successfully!"
        });
    } catch (error) {
        res.json({
            "success": false,
            "message": "Internal Server Error"
        });
    }
}

module.exports = {
    createAppoinment
}
