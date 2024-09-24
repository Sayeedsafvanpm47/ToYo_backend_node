const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/user-controllers/cartController')
const authenticateUser = require('../../middlewares/userAuthenticationMiddleware')

router.post('/api/cart/add-to-cart',authenticateUser,cartController.addToCart)
router.get('/api/cart/list-cart',authenticateUser,cartController.listCart)
router.delete('/api/cart/remove-item/:id',authenticateUser,cartController.removeItemFromCart)
router.patch('/api/cart/increase-quantity/:id',authenticateUser,cartController.increaseProductQuantity)
router.patch('/api/cart/decrease-quantity/:id',authenticateUser,cartController.decreaseProductQuantity)
module.exports = router 
