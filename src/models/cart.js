const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            },
           
            price: {
                type: Number, // quantity * priceAtAddition
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
