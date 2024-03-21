const categoryService = require('../services/category_service');
const utils = require('../utils/utils')

const categoryController = {

    createCategory: async function(req, res){
        const {title, description} = req.body;

        if (title == undefined) {
            res.status(400).json(utils.getErrorResponse({message: 'Please fill title field'}));
            return;
        } else if (description == undefined) {
            res.status(400).json(utils.getErrorResponse({message: 'Please fill description field'}));
            return;
        }

        const result = await categoryService.createCategory(title, description);

        
        res.status(result.statusCode).json(result);
    },

    fetchAllCategories: async function(req, res){
        const result = await categoryService.fetchAllCategories();

        res.status(result.statusCode).json(result);
    },

    fetchCategoryById: async function(req, res){
        const id = req.params.id;

        const result = await categoryService.fetchCategoryById(id);

        res.status(result.statusCode).json(result);
    }

}

module.exports = categoryController;