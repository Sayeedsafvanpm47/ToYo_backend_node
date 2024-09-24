const orderRepository = require('../../repositories/admin-repositories/orderRepository');
 

const listAllOrders = async () => {
    try {
        return await orderRepository.listAllOrders()
    } catch (error) {
        throw error
    }
}

const updateOrder = async (id,order) => {
    try {
        return await orderRepository.updateOrder(id,order)
    } catch (error) {
        throw error
    }
}
module.exports = {listAllOrders,updateOrder}
