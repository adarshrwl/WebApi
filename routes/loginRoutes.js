const router=require('express').Router();
const loginController=require('../controllers/logincontroller');
router.post('/loginsforuser',loginController.login );
module.exports=router;