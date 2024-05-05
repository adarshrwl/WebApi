const reservationModel = require('../models/reservationModel')
const createReservation = async (req, res) => {
    console.log(req.body)

    const { userID, eventDate, numberOfGuests } = req.body;


    if (!userID || !eventDate || !numberOfGuests) {
        return res.json({
            "success": false,
            "message": "please enter valid details"
        })
    }

    if (numberOfGuests <= 0) {
        return res.json({
            "success": false,
            "message": "Number of guests must be a positive number."
        });

    }

    const currentDate = new Date();
    const inputDate = new Date(eventDate);
    if (inputDate <= currentDate) {
        return res.json({
            "success": false,
            "message": "Event date must be in the future."
        });

    }

    try {
        const existingReservation = await reservationModel({
            userID: userID,
            eventDate: eventDate,
            numberOfGuests: numberOfGuests,
        })

        if (existingReservation) {
            return res.json({
                "success": false,
                "message": "User already exists for that date."
            });

        }
        const newReservation = new reservationModel({
            userID: userID,
            eventDate: eventDate,
            numberOfGuests: numberOfGuests
        })

        await newReservation.save();

        res.json({
            "success": true,
            "message": "User created successfully!"
        });
    }
    catch (error) {
        console.log(error)
        res.json({
            "success": true,
            "message": "Reservation Created Successfully"
        })
    }
}

module.exports = { createReservation }