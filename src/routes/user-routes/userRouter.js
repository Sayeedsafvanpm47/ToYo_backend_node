const express = require("express");
const router = express.Router();

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

router.post("/api/users/forgotPassword",userController.passWordResetUser)
module.exports = router;