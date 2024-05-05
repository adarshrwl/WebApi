const router = require('express').Router();
const reservationController = require('../controllers/reservationController');

router.post('/reserv', reservationController.createReservation)

module.exports = router;