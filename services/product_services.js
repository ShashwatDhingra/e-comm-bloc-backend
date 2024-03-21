const productModel = require('../model/product_model');
const utils = require('../utils/utils');


const productServices = {
    createProduct: async function (productData) {
        try {
            const newProduct = new productModel(productData);
            const isSaved = await newProduct.save();

            if (isSaved) {
                return {
                    status: true,
                    statusCode: 200,
                    message: "Product Created Successsfully",
                    error: null
                }
            } else {
                return utils.getErrorResponse({
                    message: "Error while making Product"
                }, 500);
            }
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    fetchAllProducts: async function () {
        try {
            const products = await productModel.find();

            if (products) {
                return {
                    status: true,
                    statusCode: 200,
                    data: products,
                    message: "Product Fetched",
                    error: null
                }
            } else {
                return utils.getErrorResponse({
                    message: "Error while fetching Product"
                }, 500);
            }
        } catch (e) {
            utils.getErrorResponse(e, 500);
        }
    },

    fetchCategoryProducts: async function(id){
        try{
            const products = await productModel.find({category: id});

            if(products){
                return {
                    status: true,
                    statusCode: 203,
                    data: products,
                    message: "Fetched Successfully Products according to Category",
                    error: null
                }
            }else{
                utils.getErrorResponse({
                    message: "Error while Fetching products"
                }, 500);
            }
        }catch(e){
            utils.getErrorResponse(e, 500);
        }
    }
}

module.exports = productServices;