const orderService = require('../../services/user-services/orderService');


const createOrder = async (req,res)=>{
    try {
        const order = await orderService.createOrder(req.user._id)
        res.status(200).send(order)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const viewOrderById = async (req,res)=>{
    try {
        const order = await orderService.viewOrderById(req.params.id)
        res.status(200).send(order)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const cancelOrder = async (req,res)=>{
    try {
        const order = await orderService.cancelOrder(req.params.id)
        res.status(200).send(order)
    } catch (error) {
        console.log(error)
     
        res.status(500).send(error)
    }
}

const viewUserOrders = async (req,res)=>{
    try {
        const orders = await orderService.viewUserOrders(req.user._id)
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send(error) 
    }
}

module.exports = {createOrder,viewOrderById,cancelOrder,viewUserOrders}