const router=require('express').Router();
const contactController=require('../controllers/contactController');

router.post('/cont',contactController.createContact)

module.exports=router;