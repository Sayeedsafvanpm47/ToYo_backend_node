const express = require('express')
const router = express.Router()

const {body} = require('express-validator')    

const categoryController = require('../../controllers/admin-controllers/categoryController')

router.get('/api/categories/:id',categoryController.createCategory)
router.post('/api/categories/createCategory',categoryController.createCategory) 

module.exports = router 
