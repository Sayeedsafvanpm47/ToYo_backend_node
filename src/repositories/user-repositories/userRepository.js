const User = require("../../models/user");
const Otp = require("../../models/otpVerify");
const userService = require("../../services/user-services/userService");
const {
  encryptPassword,
  decryptPassword,
} = require("../../helpers/encryptPassword");


const findUser = async (email) => {
  const findExistingUser = await User.findOne({ email: email });
  return findExistingUser;
};

const signUpUser = async (details) => {
  console.log(details)
  const {email,password,firstname,lastname,profilepicture,phone,address} = details
  const encryptedPassword = await encryptPassword(password);
  const signUpDetails = {
            email,
            password:encryptedPassword,
            firstname,
            lastname,
            profilepicture,
            phone,
            address  
          };
          const findExisting = await User.findOne({email:email})
          if(findExisting) throw new Error("User already exists")
          const userDetails = await User.create(signUpDetails);
        return userDetails
        }

const updatePassword = async (email, password) => {
  const findExistingUser = await User.findOne({ email: email });
  if (findExistingUser) {
    findExistingUser.password = password;
    await findExistingUser.save();
  }
  return findExistingUser;
};

const findOtp = async (email) => {
  const findExistingOtp = await Otp.findOne({ email: email });
  return findExistingOtp;
};

const updateOtp = async (email, otp) => {
  const findExistingOtp = await Otp.findOne({ email: email });
  if (findExistingOtp) {
    findExistingOtp.otp = otp;
    await findExistingOtp.save();
  }

  return findExistingOtp;
};

const createOtp = async (email, otp) => {
  const createNewOtp = new Otp({ email, otp });
  await createNewOtp.save();
  return createNewOtp;
};

const deleteOtp = async (email) => {
  const findExistingOtp = await Otp.findOne({ email: email });
  if (findExistingOtp) {
    findExistingOtp.otp = "";
    await findExistingOtp.save();
  }
  return findExistingOtp;
};

const verifyOtp = async (email,otp)=>{
  const findOtp = await Otp.findOne({email})
  const findUser = await User.findOne({email})
  let otpFound;
  if (!findOtp) throw new BadRequestError("Confirm the email in which the otp was sent!");
  otpFound = findOtp.otp;
  if (otp == otpFound) {
    findUser.verified = true 
    await findUser.save()
    return true
  } else {
    throw new BadRequestError("Otp verification failed!");
  }
}

const editProfile = async (details) => {
  const { email, firstname, lastname, phone} = details;
  const findExistingUser = await User.findOne({ email: email });
  if (findExistingUser) {
   if(firstname) findExistingUser.firstname = firstname;
    if(lastname) findExistingUser.lastname = lastname;
   if(phone) findExistingUser.phone = phone;

    await findExistingUser.save();
  } 
  return findExistingUser;

}

const updateProfilePic = async (email,profilepicture)=>{
  const findExistingUser = await User.findOne({ email})
  if(findExistingUser){
    findExistingUser.profilepicture = profilepicture
    await findExistingUser.save()
  }
  return findExistingUser
}

const addUserAddress = async (email,address)=>{
  const findExistingUser = await User.findOne({ email})
  const {city,country,building,landmark} = address
  if(findExistingUser){
    findExistingUser.address.push({city,country,building,landmark})
    await findExistingUser.save()
  }
  return findExistingUser

}

const listAddress = async (email)=>{
  const findExistingUser = await User.findOne({ email})
  if(findExistingUser){
    return findExistingUser.address
  }

}

const editAddress = async (email, addressId, details) => {
  try {
    const findExistingUser = await User.findOne({ email });
    if (!findExistingUser) {
      throw new Error('User not found');
    }

    const findAddressIndex = findExistingUser.address.findIndex((add) => add._id == addressId);
    
    if (findAddressIndex >= 0) {
      findExistingUser.address[findAddressIndex].city = details.city || findExistingUser.address[findAddressIndex].city;
      findExistingUser.address[findAddressIndex].country = details.country || findExistingUser.address[findAddressIndex].country;
      findExistingUser.address[findAddressIndex].building = details.building || findExistingUser.address[findAddressIndex].building;
      findExistingUser.address[findAddressIndex].landmark = details.landmark || findExistingUser.address[findAddressIndex].landmark;
      
      await findExistingUser.save();
    } else {
      throw new Error('Address not found');
    }

    return findExistingUser;
  } catch (error) {
    throw new Error(error.message);
  }
};


const deleteAddress = async (email, addressId) => {
  const findExistingUser = await User.findOne({ email });
  const findAddressIndex = findExistingUser.address.findIndex((add) => add._id == addressId);
  
  if (findAddressIndex >= 0) {
    findExistingUser.address.pull(findExistingUser.address[findAddressIndex]);
    await findExistingUser.save();
  }

  return findExistingUser;
};

const changePassword = async (email,oldPassword,newPassword,confirmPassword) => {
 
  const findExistingUser = await User.findOne({ email });
  if (!findExistingUser) {
    throw new Error('User not found');
  }
  const isMatch = await decryptPassword(oldPassword, findExistingUser.password);
  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }
  if(newPassword !== confirmPassword){
    throw new Error('Passwords do not match');
  }
  const encryptedPassword = await encryptPassword(newPassword);
  findExistingUser.password = encryptedPassword;
  await findExistingUser.save();
  return findExistingUser;
}

module.exports = {
  findUser,
  findOtp,
  updateOtp,
  createOtp,
  signUpUser,
  updatePassword,
  deleteOtp,
  verifyOtp,
  editProfile,
  updateProfilePic,
  addUserAddress,
  listAddress,
  editAddress,
  deleteAddress,
  changePassword 
};