const userService = require("../../services/admin-services/userService");
const {
  encryptPassword,
  decryptPassword,
} = require("../../helpers/encryptPassword");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("chordchat-common");
const Otp = require("../../models/otpVerify");
const generateOtp = require("../../helpers/generateOtp");
const { sendMail } = require("../../utils/sendMail");

//controller for blocking user

const blockUser = async (req,res)=>{
 try {
  const userStatus = await userService.blockUser(req.params.email)
  if(!userStatus) return res.status(200).json({message:"User unblocked successfully"})
  else return res.status(200).json({message:"User blocked successfully"})
 } catch (error) {
  
 }
}

const listAllUsers = async (req,res)=>{
  try {
    const users = await userService.listAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message:"Some error occured"})
  }
}

module.exports = {
blockUser,listAllUsers
};