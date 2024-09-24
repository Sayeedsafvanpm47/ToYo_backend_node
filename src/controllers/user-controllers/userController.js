const userService = require("../../services/user-services/userService");

const {
  encryptPassword,
  decryptPassword,
} = require("../../helpers/encryptPassword");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("chordchat-common");
const Otp = require("../../models/otpVerify");
const generateOtp = require("../../helpers/generateOtp");
const { sendMail } = require("../../utils/sendMail");

//controller for sign in
const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await userService.findUser(email);
    if (!checkUser) throw new BadRequestError("User not found, sorry");
    const existingPass = checkUser.password;
    const decryptedPass = await decryptPassword(password, existingPass);
    if (decryptedPass) {
      const userDetails = { ...checkUser._doc };
      delete userDetails.password;
      console.log(userDetails);
      if(checkUser.blocked) throw new BadRequestError("User is blocked, contact admin for further details")
      if(!checkUser.verified) throw new Error("User is not verified, please verify your email")
       
        const userJWT = jwt.sign(userDetails, process.env.JWT_KEY);
      res.cookie("jwt", userJWT, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return res
        .status(200)
        .json({ message: "success", data: userDetails, token: userJWT });
    } else {
      throw new BadRequestError("Invalid credentials");
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//controller for signout
const signOutUser = async (req, res, next) => {
  try {
    req.session = null;
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Some error occured" });
  }
};

//controller for otp generation and updation
const otpForUser = async (req, res) => {
  try {
    const email = req.body.email;

    const otp = await generateOtp();
    if (!email) throw new BadRequestError("Please enter an email!");
    await sendMail(email, otp).then((res) => console.log(res));
    let findOtp = await userService.findOtp(email);
    console.log(findOtp, "found otp");
    if (findOtp) {
      await userService.updateOtp(email, otp);
    } else {
      await userService.createOtp(email, otp);
    }
    return res.json({ message: "otp generated", otp, email });
  } catch (error) {}
};

//controller for otp verification 

const verifyOtp = async (req,res)=>{
  try {
    await userService.verifyOtp(req.body.email,req.body.otp)
    await userService.deleteOtp(req.body.email)
    res.status(200).json({message:'Otp verified successfully'})
    
  } catch (error) {
    res.json({errors:[error.message]})
    console.log(error)
  }
}

//controller for sign up

const signUpUser = async (req,res,next)=>{
    try {
       const signupDetails = await userService.signUpUser(req.body)
       console.log(signupDetails,'signup')
                  let email = signupDetails.email
                  const generatedOtp = await generateOtp()
                  await userService.createOtp(email,generatedOtp)
                  const userDetails = { 
                    ...signupDetails._doc,
                    _id: signupDetails._id.toString() // Convert ObjectId to string
                  };
                  
                  delete userDetails.password
                  const userJWT = jwt.sign(userDetails, process.env.JWT_KEY);
            
                res.cookie("jwt", userJWT, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                  path: "/",
                  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                });

                return res.status(201).json({
                            message: "Otp Verification pending, user registered successfully",
                            data: signupDetails,
                          });

    } catch (error) {
        console.log(error)
    }
}

const requestOtp = async (req,res)=>{
  try {
    const email = req.body.email 
    const otp = await generateOtp()
    const findOtp = await userService.findOtp(email)
    if(findOtp){
      await userService.updateOtp(email,otp)
    }else
    {
      await userService.createOtp(email,otp)
    }
    return res.json({message:'otp generated',otp})
  } catch (error) {
    console.log(error)
    return res.json({errors:[error.message]})
  }
}

const passWordResetUser = async (req, res) => {
  try {
    const { email, enteredOtp, newPassword, confirmPassword } = req.body;
    const findOtp = await userService.findOtp(email);
    let otp;
    if (!findOtp)
      throw new BadRequestError("Confirm the email in which the otp was sent!");
    otp = findOtp.otp;
    console.log(otp, "otpfound");
    console.log(enteredOtp, "entered");
    if (otp == enteredOtp) {
      if (newPassword == confirmPassword) {
        const encryptedPassword = await encryptPassword(newPassword);
        console.log(encryptedPassword);
        const user = await userService.updatePassword(email,encryptedPassword)
        if (user) {
          console.log(user,'user deets')
          await userService.deleteOtp(email)
          res.json({ message: "Password changed successfully!" });
        } else {
          throw new BadRequestError("Something went wrong!");
        }
      } else {
        throw new BadRequestError("The passwords does not match");
      }
    } else {
      throw new BadRequestError("Otp verification failed!");
    }
  } catch (error) {
          res.json({errors:[error.message]})
           console.log(error.message)
  }
};

const editProfile = async (req,res)=>{
  try {

    const user = await userService.editProfile(req.body)
   
      return res.json({message:'Profile updated successfully',data:user})
  
  } catch (error) {
    console.log(error)
    return res.json({errors:[error.message]})
  }
}


const updateProfilePic = async (req,res)=>{
  try {
    const picture = await userService.updateProfilePic(req.body.email,req.body.image)
    return res.json({message:'Profile pic updated successfully',data:picture})
  } catch (error) {
    return res.json({errors:[error.message]})
  }
}

const addUserAddress = async (req,res)=>{
  try {
    const user = await userService.addUserAddress(req.body.email,req.body.address)
    return res.json({message:'Address added successfully',data:user})
  } catch (error) {
    return res.json({errors:[error.message]})
  }
}
const listAddress = async (req,res)=>{

  try {
    const address = await userService.listAddress(req.params.email)
    return res.status(200).json(address)  
  
  } catch (error) {
    return res.status(500).json({message:"Some error occured"})
  }
  }

const editAddress = async (req,res)=>{
try {
  const addressId = req.params.addressId 
  const email = req.user.email 
await userService.editAddress(email,addressId,req.body)
return res.json({message:'Address updated successfully'})
} catch (error) {
  return res.json({errors:[error.message]})
}
}

const deleteAddress = async (req,res)=>{
try {
  const email = req.user.email
  const addressId = req.params.addressId
  await userService.deleteAddress(email,addressId)
  return res.json({message:'Address deleted successfully'})
} catch (error) {
  return res.json({errors:[error.message]})
}
}
const changePassword = async (req,res)=>{
  try {

    const email = req.user.email 
    const {oldPassword,newPassword,confirmPassword} = req.body 
    await userService.changePassword(email,oldPassword,newPassword,confirmPassword)
    return res.json({message:'Password changed successfully'})
    
  } catch (error) {
    return res.json({errors:[error.message]}) 
  }
}

module.exports = {
  signInUser,
  signOutUser,
  signUpUser,
  otpForUser,
  passWordResetUser,
  verifyOtp,
  requestOtp,
  editProfile,
  updateProfilePic,
  addUserAddress,
  listAddress,
  editAddress,
  deleteAddress,
  changePassword
};