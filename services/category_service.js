const categoryModel = require('../model/category_model');
const utils = require('../utils/utils');


const categoryService = {

    createCategory: async function (title, description) {
        try {
            const newCategory = new categoryModel({ title, description });

            const isSaved = await newCategory.save();
            console.log(isSaved)

            if (isSaved) {
                return {
                    status: true,
                    message: 'Created Category Successfully',
                    statusCode: 200,
                    error: null
                };
            } else {
                return utils.getErrorResponse({ message: "Error while creating Category" }, 500);
            }
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    fetchAllCategories: async function () {
        try {
            const categories = await categoryModel.find();

            if (categories)
                return {
                    status: true,
                    message: 'Successfully fetched all Categories',
                    data: categories,
                    statusCode: 200,
                    error: null
                }

            return utils.getErrorResponse(
                {
                    "message": "Error while loading Categories"
                }
                , 404);
        } catch (e) {
            return utils.getErrorResponse({
                e
            }, 500);
        }
    },

    fetchCategoryById: async function (id) {
        try {
            const category = await categoryModel.findById(id);

            if (category) {
                return {
                    status: true,
                    message: 'Successfully fetched category by id',
                    data: category,
                    statusCode: 200,
                    error: null
                }
            } else {

                return utils.getErrorResponse(
                    {
                        "message": "Error while loading category"
                    }
                    , 404);
            }
        } catch (e) {
            return utils.getErrorResponse(
                e
                , 500);
        }
    }

}

module.exports = categoryService;