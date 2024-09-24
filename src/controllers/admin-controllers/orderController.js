const orderService = require('../../services/admin-services/orderService');


const listAllOrders = async (req,res)=>{
    try {
        const orders = await orderService.listAllOrders()
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const updateOrder = async (req,res)=>{
    try {
        const order = await orderService.updateOrder(req.params.id,req.body)
        res.status(200).send(order)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {listAllOrders,updateOrder}