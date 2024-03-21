const productServices = require('../services/product_services');

const productController = {

    createProduct: async function (req, res) {
        const productData = req.body;
        const result = await productServices.createProduct(productData);

        res.status(result.statusCode).json(result);
    },

    fetchAllProducts: async function (req, res) {
        const result = await productServices.fetchAllProducts();

        res.status(result.statusCode).json(result);
    },

    fetchCategoryProducts : async function(req,res){
        const id = req.params.id;
        const result = await productServices.fetchCategoryProducts(id);

        res.status(result.statusCode).json(result);
    }

}

module.exports = productController;