const cartRepository = require('../../repositories/user-repositories/cartRepository');


const addToCart = async (cartData) => {
    try {
        const cart = await cartRepository.addToCart(cartData);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

const listCart = async (userId) => {
    try {
        const cart = await cartRepository.listCart(userId);
        return cart;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

const removeItemFromCart = async (userId,id) => {
    try {
        const cart = await cartRepository.removeItemFromCart(userId,id);
        return cart;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

const increaseProductQuantity = async (userId,productId,stock) => {
    try {
        const cart = await cartRepository.increaseProductQuantity(userId,productId,stock);
        return cart;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

const decreaseProductQuantity = async (userId,productId) => {
    try {
        const cart = await cartRepository.decreaseProductQuantity(userId,productId);
        return cart;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

module.exports = {addToCart,listCart,removeItemFromCart,increaseProductQuantity,decreaseProductQuantity}