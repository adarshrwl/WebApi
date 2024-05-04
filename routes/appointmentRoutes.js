    const router =require('express').Router()
    const appointmentController =require('../controllers/appointmentController')
    router.post('/appointment',appointmentController.createAppointment);
    module.exports=router;