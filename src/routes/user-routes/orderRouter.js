const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/user-controllers/orderController')
const authenticateUser = require('../../middlewares/userAuthenticationMiddleware')

router.post('/api/order/create-order',authenticateUser,orderController.createOrder)
router.get('/api/order/view-order/:id',authenticateUser,orderController.viewOrderById)
router.delete('/api/order/cancel-order/:id',authenticateUser,orderController.cancelOrder)
router.get('/api/order/view-user-orders',authenticateUser,orderController.viewUserOrders)
module.exports = router
