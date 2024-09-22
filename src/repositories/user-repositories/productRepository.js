const Product = require('../../models/product')


const findProduct = async (id)=>{
    const findExistingProduct = await Product.findOne({_id:id})
    return findExistingProduct
}


const searchProduct = async (searchTerm)=>{
    console.log(searchTerm)
    let prod_name = searchTerm.trim();
console.log(prod_name)
    const products = await Product.find({name:{$regex:prod_name,$options:'i'}})
    console.log(products)
    return products
}

const getAllProducts = async ()=>{
    const products = await Product.find()
    return products
}

const sortByCategory = async (category) => {
    const products = await Product.aggregate([
        {
            $lookup: {
                from: 'categories', /*  */
                localField: 'category',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails' 
        },
        {
            $match: {
                'categoryDetails.name': category
            }
        }
    ]);
    return products;
};


const sortByPrice = async (details)=>{
    console.log(details)
    const products = await Product.find({price:{ $gte: details.min, $lte: details.max}})
    return products
}

const checkStock = async (id)=>{
    const product = await Product.findOne({_id:id})
    if(product.stock>0)
    {
        return true
    }
    return false

}
module.exports = {
    findProduct,searchProduct,getAllProducts,sortByCategory,sortByPrice,checkStock
}
