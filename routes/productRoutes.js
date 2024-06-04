const router=require('express').Router()
const productControllers=require('../controllers/productController')
router.post('/create',productControllers.createProduct)
router.get('/get_all_products',productControllers.getAllProducts)
// fetch single product
router.get('/get_single_product/:id',productControllers.getProduct)
//if post ma bhayo bhane 
//if Post body(data)

module.exports=router;