const reservationModel = require('../models/reservationModel');
const createReservation = async (req, res) => {
    console.log(req.body);

    const { userID, eventDate, numberOfGuests } = req.body;

    // Check if all required fields are provided
    if (!userID || !eventDate || !numberOfGuests) {
        return res.json({
            "success": false,
            "message": "Please enter valid details."
        });
    }

    // Validate that number of guests is positive
    if (numberOfGuests <= 0) {
        return res.json({
            "success": false,
            "message": "Number of guests must be a positive number."
        });
    }

    // Check that the event date is in the future
    const currentDate = new Date();
    const inputDate = new Date(eventDate);
    if (inputDate <= currentDate) {
        return res.json({
            "success": false,
            "message": "Event date must be in the future."
        });
    }

    try {
        // Search for an existing reservation with the same userID and eventDate
        const existingReservation = await reservationModel.findOne({
            userID: userID,
            eventDate: eventDate
        });

        if (existingReservation) {
            return res.json({
                "success": false,
                "message": "User already has a reservation for that date."
            });
        }

        // Create a new reservation if no existing reservation is found
        const newReservation = new reservationModel({
            userID: userID,
            eventDate: eventDate,
            numberOfGuests: numberOfGuests
        });

        // Save the new reservation to the database
        await newReservation.save();

        res.json({
            "success": true,
            "message": "Reservation created successfully!"
        });
    } catch (error) {
        console.error(error);
        res.json({
            "success": false,
            "message": "Internal server error!"
        });
    }
};

module.exports = { createReservation };
