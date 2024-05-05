const router=require('express').Router();
const contactController=require('../controllers/contactController');

router.post('/users',contactController.createContact)

module.exports=router;