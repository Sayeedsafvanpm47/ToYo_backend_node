const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model


const UserSchema = new Schema({
  email: {
    type: String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
},{ timestamps: true });

// Create and export the User model
module.exports = mongoose.model("User", UserSchema);    