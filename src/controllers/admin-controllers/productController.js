const productService = require('../../services/admin-services/productService');



const createProduct = async (req,res)=>{
    try {
        const product = await productService.createProduct(req.body)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const editProduct = async (req,res)=>{
    try {
        const details = {id:req.params.id,...req.body}
        console.log(details,'prod details')
        const product = await productService.editProduct(details)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}


const disableProduct = async (req,res)=>{
    try {
        const product = await productService.disableProduct(req.params.id)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateStock = async (req,res)=>{
    try {
        const product = await productService.updateStock(req.params.id,req.body.stock)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const featureProduct = async (req,res)=>{  
    try {
        const product = await productService.featureProduct(req.params.id)
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const addDiscount = async (req,res)=>{
    try {
        const discount = req.body.discount
        const products = await productService.addDiscount(req.params.id,discount)
        res.status(201).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
createProduct,editProduct,disableProduct,updateStock, featureProduct, addDiscount
}
