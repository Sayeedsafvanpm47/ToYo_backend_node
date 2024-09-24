const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Product = require('../../models/product');


const createOrder = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            throw new Error('Cart not found for user');
        }

        const items = cart.items.map(item => {
            const total = item.quantity * item.price; // Assuming price is already set correctly in the cart
            return {
                product: item.product,
                quantity: item.quantity,
                price: item.price,
                total: total
            };
            
        });
        const totalPrice = items.reduce((sum, item) => sum + item.total, 0); 

        const order = new Order({
            user: userId,
            items: items,
            totalPrice: totalPrice,
            shippingAddress: {}, // Add logic to gather the shipping address from the user
            paymentStatus: 'Pending' // Adjust based on your application's payment process
        });

        // Step 4: Save the order
        await order.save();

        // Optionally: Clear the cart after creating the order
        cart.items = []; // Empty the cart
        await cart.save(); // Save the cleared cart

        return order;

    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

const viewOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('items.product');
        return order;
    } catch (error) {
        throw new Error(error.message);
    }
}

const cancelOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.orderStatus !== 'Pending' && order.orderStatus !== 'Processing') {
            throw new Error('Order cannot be cancelled');
        }

        order.orderStatus = 'Cancelled';
        await order.save();
    } catch (error) {
        console.log(error) 
        throw new Error(error.message);
    }
}

const viewUserOrders = async (userId) => {
    try {
        const orders = await Order.find({ user: userId });
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createOrder,viewOrderById,cancelOrder,viewUserOrders}