const express = require('express')
const router = express.Router()

const {body} = require('express-validator')    

const productController = require('../../controllers/admin-controllers/productController')




// admin routes 
router.post('/api/products/create-product',productController.createProduct) 
router.patch('/api/products/edit-product/:id',productController.editProduct)
router.patch('/api/products/disable-product/:id',productController.disableProduct)
router.patch('/api/products/update-stock/:id',productController.updateStock)
router.patch('/api/products/feature-product/:id',productController.featureProduct)
router.patch('/api/products/add-discount/:id',productController.addDiscount)

module.exports = router 
