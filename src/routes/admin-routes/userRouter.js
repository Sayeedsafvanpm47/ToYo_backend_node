const express = require("express");
const router = express.Router();

const { body } = require("express-validator");


const userController = require("../../controllers/admin-controllers/userController");

//route to sign in
router.get('/api/users/block-user/:email',userController.blockUser)
router.get('/api/users/list-all-users',userController.listAllUsers)
module.exports = router;