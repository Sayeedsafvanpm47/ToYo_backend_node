const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model

CategorySchema = new Schema({
	name: {
		type: String,
		
	},
	description: {
		type: String
	}
},{ timestamps: true });

// Create and export the User model
module.exports = mongoose.model("Category", CategorySchema);    