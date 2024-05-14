const router=require('express').Router();
const loginController=require('../controllers/logincontroller');
router.post('/login',loginController.login );
module.exports=router;