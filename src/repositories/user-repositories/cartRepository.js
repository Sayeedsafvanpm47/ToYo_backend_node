const Cart = require('../../models/cart');
const mongoose = require('mongoose');

const addToCart = async (cartData) => {
    try {
        const findExistingCart = await Cart.findOne({user: cartData.user});
        if(findExistingCart){
           let productExists = findExistingCart.items.findIndex(item => item.product.equals(cartData.product));
           if(productExists !== -1){
               findExistingCart.items[productExists].quantity += parseInt(cartData.quantity)
               return await findExistingCart.save();
        }else
       {
              findExistingCart.items.push(cartData)
              return await findExistingCart.save();
       }

    }else
    {
        const newCart = new Cart({
            user: cartData.user,
            items: [{
              product: cartData.product,
              quantity: cartData.quantity,
              price: cartData.price
            }]
          });
          return await newCart.save();
    }
    } catch (error) {
        throw new Error(error.message);
    }
}

const listCart = async (userId) => {
    try {
        const cart = await Cart.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) } // Match the user by userId
            },
            {
                $unwind: '$items' // Unwind the items array
            },
            {
                $lookup: {
                    from: 'products', // Collection name of the Product model
                    localField: 'items.product', // Field in Cart collection
                    foreignField: '_id', // Field in Product collection
                    as: 'productDetails' // Store the result in productDetails
                }
            },
            {
                $unwind: '$productDetails' // Unwind productDetails array
            },
            {
                $project: {
                    _id: 0, // Don't include the cart _id
                    'items.quantity': 1, // Include the quantity
                    'items.product': 1, // Include the product reference
                    'productPrice': '$productDetails.mrp' // Alias product price to avoid conflict
                }
            },
            {
                $group: {
                    _id: '$user', // Group by the user
                    items: {
                        $push: {
                            product: '$items.product', // Push product information
                            quantity: '$items.quantity',
                            price: '$productPrice' // Use the aliased product price
                        }
                    }
                }
            }
        ]);
        return cart.length ? cart[0] : null; // Return the result or null if no cart exists
    } catch (error) {
        throw new Error(error.message);
    }
};

const removeItemFromCart = async (userId,id) => {
    try {
        console.log(id,'id')

        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Use .equals() to compare ObjectId
            const findItemIndex = cart.items.findIndex(item => item.product.equals(id));
            
            if (findItemIndex === -1) throw new Error('Item not found in cart');

            // Remove the item at the found index
            cart.items.splice(findItemIndex, 1);

            return await cart.save(); // Save changes
        } else {
            throw new Error('Cart not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const increaseProductQuantity = async (userId,productId,stock) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Use .equals() to compare ObjectId
            const findItemIndex = cart.items.findIndex(item => item.product.equals(productId));
            
            if (findItemIndex === -1) throw new Error('Item not found in cart');
             console.log(stock,'stock in increase')
            // Increase the quantity of the found item
            if(cart.items[findItemIndex].quantity >= stock) throw new Error('Stock limit reached');
            cart.items[findItemIndex].quantity += 1;

            return await cart.save(); 
        } else {
            throw new Error('Cart not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const decreaseProductQuantity = async (userId,productId) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Use .equals() to compare ObjectId
            const findItemIndex = cart.items.findIndex(item => item.product.equals(productId));
            
            if (findItemIndex === -1) throw new Error('Item not found in cart');

            // Decrease the quantity of the found item
            if(cart.items[findItemIndex].quantity <= 1) throw new Error('Quantity cannot be less than 1');
            cart.items[findItemIndex].quantity -= 1;

            return await cart.save(); // Save changes
        } else {
            throw new Error('Cart not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {addToCart,listCart,removeItemFromCart,increaseProductQuantity,decreaseProductQuantity}