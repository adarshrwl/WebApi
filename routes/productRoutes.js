const router=require('express').Router()
const productControllers=require('../controllers/productController')
router.post('/create',productControllers.createProduct)
module.exports=router;