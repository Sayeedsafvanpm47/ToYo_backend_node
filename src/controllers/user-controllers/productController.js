const productService = require('../../services/user-services/productService');


const findProduct = async (req,res)=>{
    try {
        const product = await productService.findProduct(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error) 
    }
}


const getAllProducts = async (req,res)=>{
    try {
        const products = await productService.getAllProducts()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)}
}

const searchProduct = async (req,res)=>{
    try {
     
        const products = await productService.searchProduct(req.params.name)
        console.log(products)
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}


const sortByCategory = async (req,res)=>{
   try {
       const products = await productService.sortByCategory(req.params.category)
       res.status(200).send(products)
   } catch (error) {
       res.status(500).send(error)
   }
}

const sortByPrice = async (req,res)=>{
    try {
        const products = await productService.sortByPrice(req.body)
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

const checkStock = async (req,res)=>{
    try {
        const product = await productService.checkStock(req.params.id)
        res.status(200).send(product)
    } catch (error) {   
        res.status(500).send(error)
    }
}
module.exports = {
    findProduct,searchProduct,getAllProducts,sortByCategory,sortByPrice,checkStock
}
