const { ObjectId } = require('mongodb');
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

const sortByCategory = async (id) => {
 try {
    const products = await Product.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        { $unwind: '$categoryDetails' },
        { $match: { 'categoryDetails._id': new ObjectId(id) } }
    ])
    return products;
 } catch (error) {
  console.log(error)  
 }
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
        return product.stock
    }
    return false

}

const showFeaturedProducts = async (req,res)=>{
    try {
        const products = await Product.aggregate([
            { $match: { featured:  true  } },  
            { $sample: { size: 10 } }        
        ]);
       return products
    } catch (error) {
        console.log(error)
        return error 
    }

}
module.exports = {
    findProduct,searchProduct,getAllProducts,sortByCategory,sortByPrice,checkStock,showFeaturedProducts
}
