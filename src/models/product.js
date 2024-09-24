const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model


const ProductSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  mrp:{
 type : Number,
 required: true
  },
  stock:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },

  category : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  images: {
    type: Array
  },
  featured : {
    type : Boolean,
    default: false 
  },
  product_discount:{
    type: Number,
    default: 0
  },
  disabled : {
    type : Boolean,
    default: false
  }
 

},{ timestamps: true });

ProductSchema.virtual('price').get(function() {
    const discount = this.product_discount || 0;
    return this.mrp - (this.mrp * discount / 100);
  });
  
  ProductSchema.set('toJSON', { virtuals: true });
  ProductSchema.set('toObject', { virtuals: true });

// Create and export the User model
module.exports = mongoose.model("Product", ProductSchema);    