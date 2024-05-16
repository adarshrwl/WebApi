const router =require('express').Router()
const userControllers=require('../controllers/userControllers')

//Make a Create user API(Post ho kina bhane user ko data user samma aaudai xa) 
router.post('/create',userControllers.createUser)

router.post('/login',userControllers.loginUser)

//exporting 
module.exports=router;
