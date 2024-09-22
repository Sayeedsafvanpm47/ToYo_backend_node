const { Number } = require('mongoose/lib/schema/index')
const Product = require('../../models/product')




const createProduct = async (details)=>{
    const newProduct = new Product(details)
    await newProduct.save()
    return newProduct
}

const editProduct = async (details) => {
    console.log(details.id)
    const findProd = await Product.findOne({_id:details.id})
    console.log(findProd)
    const updatedProduct = await Product.updateOne(
      {_id:details.id},
        { 
            $set: {
                name: details.name,
                price: parseFloat(details.price),
                category: details.category,
                description: details.description,
                images: details.image,  
                featured: details.featured,
                stock: parseFloat(details.stock),
                product_discount: details.product_discount
            }
        },
        { new: true, omitUndefined: true }  
    );

    return updatedProduct;
};

const disableProduct = async (id) => {
    try {
        const product = await Product.findOne({_id:id})
        if(product)
        {
            product.disabled = !product.disabled 
            await product.save() 
        }else
        {
            throw new Error('Product not found')
        }

        return product
    }catch(error){
        return error
    }
}


const updateStock = async (id,stock) => {
    try {
        const product = await Product.updateOne({_id:id},{stock:stock})
        return product
    } catch (error) {
        console.log(error)
        return error 
    }
}
module.exports = {
   createProduct,editProduct,disableProduct,updateStock
}
