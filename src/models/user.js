const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid'); 
// Define the schema for the User model


const UserSchema = new Schema({
  email: {
    type: String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  firstname:{
    type:String
  },
  lastname:{
    type:String 
  },
  role:{
    type:String,
    default:'user'
  },
  blocked:{
    type:Boolean,
    default:false 
  },
  phone:{
    type:String 
  },
  address: [{
    
      city: {
        type: String
      },

      country: {
        type: String
      },
      building: {
        type: String
      },
      landmark: {
        type: String
    }
}
  ],
  profilepicture : {
    type : String 
  },
  verified : {
    type : Boolean,
    default : false 
  }

},{ timestamps: true });

// Create and export the User model
module.exports = mongoose.model("User", UserSchema);    