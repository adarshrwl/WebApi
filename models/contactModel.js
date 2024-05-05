const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        require: true
    }
});

const Contact = mongoose.model('contact', contactSchema)
module.exports = Contact;