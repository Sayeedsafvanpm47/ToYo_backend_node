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

module.exports = {
    findCategory,createCategory  
}
