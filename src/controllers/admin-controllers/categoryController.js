const categoryService = require('../../services/admin-services/categoryService');


const findCategory = async (req,res)=>{
    try {
        const category = await categoryService.findCategory(req.params.id)
        res.status(200).send(category)
    } catch (error) {
        res.status(500).send(error) 
    }
}

const createCategory = async (req,res)=>{
    try {
        const category = await categoryService.createCategory(req.body)
        res.status(201).send(category)
    } catch (error) {
        res.status(500).send(error)
    }
}

getAllCategories = async (req,res)=>{
    try {
        const categories = await categoryService.getAllCategories()
        res.status(200).send(categories)
    } catch (error) {
        res.status(500).send(error)}
    }

editCategory = async (req,res)=>{
    try {
        const details = {id:req.params.id,...req.body}
        const category = await categoryService.editCategory(details)
        res.status(201).send(category)
    } catch (error) {
        console.log(error,'error in controller')
        res.status(500).send(error)
    }
}

const disableCategory = async (req,res)=>{
    try {
        const category = await categoryService.disableCategory(req.params.id)
        res.status(201).send(category)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    findCategory, createCategory, getAllCategories, editCategory, disableCategory
}
