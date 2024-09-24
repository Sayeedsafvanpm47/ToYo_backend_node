const express = require('express')
const router = express.Router()

const {body} = require('express-validator')    


const productController = require('../../controllers/user-controllers/productController')





// user routes
router.get('/api/products/get-one/:id',productController.findProduct)
router.get('/api/products/search/:name' ,productController.searchProduct)
router.get('/api/products/get-all',productController.getAllProducts)
router.get('/api/products/sort-by-category/:id',productController.sortByCategory)
router.get('/api/products/sort-by-price',productController.sortByPrice)
router.get('/api/products/check-stock/:id',productController.checkStock)
router.get('/api/products/show-featured',productController.showFeaturedProducts)

module.exports = router 
