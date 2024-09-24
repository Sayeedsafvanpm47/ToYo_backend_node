const categoryRepository = require('../../repositories/admin-repositories/categoryRepository')


const findCategory = async (id)=>{
    return categoryRepository.findProduct(id)
}

const createCategory = async (details)=>{
    return categoryRepository.createCategory(details)
}

const getAllCategories = async ()=>{
    return categoryRepository.getAllCategories()
}

const editCategory = async (details) => {
    return categoryRepository.editCategory(details)
}

const disableCategory = async (id) => {
    return categoryRepository.disableCategory(id)
}


module.exports = { findCategory, createCategory, getAllCategories, editCategory, disableCategory }    