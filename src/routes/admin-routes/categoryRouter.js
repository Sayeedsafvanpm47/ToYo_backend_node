const express = require('express')
const router = express.Router()
const Category = require('../../models/category')

const {body} = require('express-validator')    

const categoryController = require('../../controllers/admin-controllers/categoryController')

router.get('/api/categories/find-category/:id',categoryController.createCategory)
router.post('/api/categories/create-category',categoryController.createCategory) 
router.get('/api/categories/get-all-categories',categoryController.getAllCategories)
router.patch('/api/categories/edit-category/:id',categoryController.editCategory)
router.patch('/api/categories/disable-category/:id',categoryController.disableCategory)



module.exports = router 
