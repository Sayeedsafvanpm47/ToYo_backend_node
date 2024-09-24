const Order = require('../../models/order');

const listAllOrders = async () => {
    return await Order.find()
}


const updateOrder = async (id,order) => {
try {
    const orderStatus = order.orderStatus
    const findOrder = await Order.findOne({_id:id})
    if(findOrder.orderStatus === 'delivered' || findOrder.orderStatus === 'cancelled'){
        throw new Error('Order is already delivered or cancelled')
    }
    findOrder.orderStatus = orderStatus 
    await findOrder.save()
    return findOrder
    
} catch (error) {
    console.log(error)
    throw new Error(error)
}
}
module.exports = {listAllOrders,updateOrder}