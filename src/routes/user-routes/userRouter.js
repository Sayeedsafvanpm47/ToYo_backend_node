const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/userAuthenticationMiddleware");

const { body } = require("express-validator");


const userController = require("../../controllers/user-controllers/userController");

//route to sign in
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid!!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must enter a password!"),
  ],

  userController.signInUser
);

router.post("/api/users/signout", userController.signOutUser);

router.post("/api/users/generate-otp", userController.otpForUser);

router.post("/api/users/signup", [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Invalid password credentials"),

],
 userController.signUpUser);

router.post('/api/users/verify-otp',userController.verifyOtp)

router.post("/api/users/forgot-password",userController.passWordResetUser)
router.post('/api/users/request-otp',userController.requestOtp)
router.post('/api/users/edit-profile',userController.editProfile)
router.post('/api/users/update-profile-pic',userController.updateProfilePic)
router.post('/api/users/add-address',userController.addUserAddress)
router.get('/api/users/list-address/:email',userController.listAddress)
router.post('/api/users/edit-address/:addressId',authenticateUser,userController.editAddress)
router.delete('/api/users/delete-address/:addressId',authenticateUser,userController.deleteAddress)
router.post('/api/users/change-password',authenticateUser,userController.changePassword)
module.exports = router;