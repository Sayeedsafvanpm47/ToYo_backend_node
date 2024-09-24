const User = require("../../models/user");
const Otp = require("../../models/otpVerify");

const blockUser = async (email)=>{
  const findUser = await User.findOne({email})
  if(findUser)
  {
    findUser.blocked = !findUser.blocked 
    await findUser.save()
  }
  return findUser.blocked
}

const listAllUsers  = async ()=>{
  const users = await User.find()
  return users
}

module.exports = {
blockUser,listAllUsers
};