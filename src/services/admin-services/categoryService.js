const categoryRepository = require('../../repositories/admin-repositories/categoryRepository')


const findCategory = async (id)=>{
    return categoryRepository.findProduct(id)
}

const createCategory = async (details)=>{
    return categoryRepository.createCategory(details)
}

module.exports = { findCategory,createCategory }    