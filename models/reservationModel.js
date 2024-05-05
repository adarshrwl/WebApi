const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        require: true
    }
});

const Reservation = mongoose.model('reservation', reservationSchema)
module.exports = Reservation;