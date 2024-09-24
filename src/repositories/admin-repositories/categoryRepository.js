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

const getAllCategories = async ()=>{
    const categories = await Category.find()
    return categories
}

const editCategory = async (details) => {
   
    const updatedProduct = await Category.updateOne(
      {_id:details.id},
        { 
            $set: {
                name: details.name,
                description: details.description,
            }
        },
        { new: true, omitUndefined: true }  
    );

    return updatedProduct;

}

const disableCategory = async (id) => { 
    try {
        const category = await Category.findOne({_id:id})
        if(category)
        {
            category.disabled = !category.disabled 
            await category.save() 
        }else
        {
            throw new Error('Category not found')
        }

        return category
    }catch(error){
        return error
    }
}



module.exports = {
    findCategory, createCategory, getAllCategories, editCategory, disableCategory
}
