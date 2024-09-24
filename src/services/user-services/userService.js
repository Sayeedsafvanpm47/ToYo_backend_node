const userRepository = require('../../repositories/user-repositories/userRepository')


const findUser = async (email)=>{
          return userRepository.findUser(email)
}

const signUpUser = async (details)=>{
          return userRepository.signUpUser(details)
}

const updatePassword = async (email,password)=>{
          return userRepository.updatePassword(email,password)
}

const findOtp = async (email)=>{
          return userRepository.findOtp(email)
}

const updateOtp = async (email,otp)=>{
          return userRepository.updateOtp(email,otp)
}

const createOtp = async (email,otp)=>{
          return userRepository.createOtp(email,otp)
}

const deleteOtp = async (email)=>{
          return userRepository.deleteOtp(email)
}

const verifyOtp = async (email,otp)=>{
    return userRepository.verifyOtp(email,otp)
}

const editProfile = async (details)=>{
    return userRepository.editProfile(details)
}

const updateProfilePic = async (email,profilepicture)=>{
    return userRepository.updateProfilePic(email,profilepicture)
}

const addUserAddress = async (email,address)=>{
    return userRepository.addUserAddress(email,address)
} 

const listAddress = async (email)=>{
    return userRepository.listAddress(email)
}

const editAddress = async (email,address,details)=>{
    return userRepository.editAddress(email,address,details)
}

const deleteAddress = async (email,address)=>{
    return userRepository.deleteAddress(email,address)
}

const changePassword = async (email,oldPassword,newPassword,confirmPassword)=>{
    return userRepository.changePassword(email,oldPassword,newPassword,confirmPassword)
}
module.exports = {
findUser,findOtp,updateOtp,createOtp,signUpUser,updatePassword,deleteOtp,verifyOtp,editProfile,updateProfilePic,addUserAddress,listAddress,editAddress,deleteAddress,changePassword
}