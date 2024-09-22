const Category = require('../../models/category')


const findCategory = async (id)=>{
    const findExistingCategory = await Category.findOne({_id:id})
    return findExistingCategory
}

const createCategory = async (details)=>{
    const newCategory = new Category(details)
    await newCategory.save()
    return newCategory
}

module.exports = {
    findCategory,createCategory
}
