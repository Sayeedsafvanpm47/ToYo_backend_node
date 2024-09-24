const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/admin-controllers/orderController')
const authenticateUser = require('../../middlewares/userAuthenticationMiddleware')


router.get('/api/order/get-all-orders',authenticateUser,orderController.listAllOrders)
router.patch('/api/order/update-order/:id',authenticateUser,orderController.updateOrder)

module.exports = router 