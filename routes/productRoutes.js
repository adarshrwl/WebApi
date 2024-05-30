const router=require('express').Router()
const productControllers=require('../controllers/productController')
router.post('/create',productControllers.createProduct)
router.get('/get_all_products',productControllers.getAllProducts)
module.exports=router;