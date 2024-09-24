const productRepository = require('../../repositories/admin-repositories/productRepository')




const createProduct = async (details)=>{
    return productRepository.createProduct(details)
}

const editProduct = async (details)=>{
    return productRepository.editProduct(details)
}

const disableProduct = async (id)=>{
    return productRepository.disableProduct(id)
}

const updateStock = async (id,stock)=>{
    return productRepository.updateStock(id,stock)
}

const featureProduct = async (id)=>{
    return productRepository.featureProduct(id)
}

const addDiscount = async (id,discount)=>{
return productRepository.addDiscount(id,discount)
}


module.exports = {createProduct,editProduct,disableProduct,updateStock, featureProduct, addDiscount}