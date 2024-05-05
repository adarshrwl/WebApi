const router = require('express').Router();
const appoinmentController = require('../controllers/appointmentController');

router.post('/appoints', appoinmentController.createAppoinment)

module.exports = router;