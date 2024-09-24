const cartService = require('../../services/user-services/cartService');
const productService = require('../../services/user-services/productService');

const addToCart = async (req,res)=>{
    try {
        let cartData
        cartData = {user:req.user._id,...req.body}
        if(!req.user) throw new Error('User not found')
        const cart = await cartService.addToCart(cartData)

        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(error)
    }
}

const listCart = async (req,res)=>{
    try {
        const cart = await cartService.listCart(req.user._id)
        res.status(200).send(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const removeItemFromCart = async (req,res)=>{
    try {
        const userId = req.user._id
        const prodId = req.params.id
        const cart = await cartService.removeItemFromCart(userId,prodId)
        res.status(200).send(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const increaseProductQuantity = async (req,res)=>{
    try {
        const userId = req.user._id
        const prodId = req.params.id
        const stock = await productService.checkStock(prodId)
        console.log(stock,'stk in controller')
        const cart = await cartService.increaseProductQuantity(userId,prodId,stock)
        res.status(200).send(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const decreaseProductQuantity = async (req,res)=>{
    try {
        const userId = req.user._id
        const prodId = req.params.id
        const stock = await productService.checkStock(prodId)
        console.log(stock-1)
        if(stock-1 > 0)
        {
        const cart = await cartService.decreaseProductQuantity(userId,prodId)
        
        res.status(200).send(cart)
        }else
        {
            res.status(400).send('Stock not available')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
module.exports = {
 addToCart,listCart,removeItemFromCart,increaseProductQuantity,decreaseProductQuantity
}
