const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1  
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
