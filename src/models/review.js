const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model

ReviewSchema = new Schema({
	username: {
		type: Schema.Types.ObjectId,
        ref : 'User'
		
	},
    product_id:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
	content: {
		type: String
	},
    rating:{
        type:Number
    }
},{ timestamps: true });

// Create and export the User model
module.exports = mongoose.model("Review", ReviewSchema);    