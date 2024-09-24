const orderRepository = require('../../repositories/user-repositories/orderRepository'); 

const createOrder = async (userId)=>{
    try {
        const order = await orderRepository.createOrder(userId)
        return order
    } catch (error) {
        throw error
    }
}

const viewOrderById = async (orderId)=>{
    try {
        const order = await orderRepository.viewOrderById(orderId)
        return order
    } catch (error) {
        throw error
    }
}

const cancelOrder = async (orderId)=>{
    try {
        const order = await orderRepository.cancelOrder(orderId)
        return order
    } catch (error) {
        throw error
    }
}

const viewUserOrders = async (userId)=>{
    try {
        const orders = await orderRepository.viewUserOrders(userId)
        return orders
    } catch (error) {
        throw error
    }
}
module.exports = {createOrder,viewOrderById,cancelOrder,viewUserOrders}