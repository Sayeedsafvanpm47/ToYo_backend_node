const productRepository = require('../../repositories/user-repositories/productRepository')


const findProduct = async (id)=>{
    return productRepository.findProduct(id)
}


const searchProduct = async (searchTerm)=>{
    return productRepository.searchProduct(searchTerm)
}

const getAllProducts = async ()=>{
    return productRepository.getAllProducts()
}

const sortByCategory = async (id)=>{
    return productRepository.sortByCategory(id)
} 

const sortByPrice = async (details)=>{
    return productRepository.sortByPrice(details)
}

const checkStock = async (id)=>{
    return productRepository.checkStock(id)
}

const showFeaturedProducts = async ()=>{
    return productRepository.showFeaturedProducts()
}


module.exports = {findProduct,searchProduct,getAllProducts,sortByCategory,sortByPrice,checkStock, showFeaturedProducts}