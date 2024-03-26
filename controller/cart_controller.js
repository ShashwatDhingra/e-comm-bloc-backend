const cartService = require('../services/cart_services')
const utils = require('../utils/utils');

const cartController = {
    addToCart: async function (req, res) {
        const { product, user, quantity } = req.body;

        const result = await cartService.addToCart(product, user, quantity);

        res.status(result.statusCode).json(result);
    },

    removeFromCart: async function (req, res) {
        const { product, user } = req.body;

        if (user == undefined) {
            res.status(400).json(utils.getErrorResponse({ message: 'Please fill user field' }));
            return;
        } else if (product == undefined) {
            res.status(400).json(utils.getErrorResponse({ message: 'Please fill product field' }));
            return;
        }

        const result = await cartService.removeFromCart(product, user);

        res.status(result.statusCode).json(result);
    },

    getCartForUser: async function (req, res) {
        const userId = req.params.userId;

        const result = await cartService.getCartForUser(userId);

        res.status(result.statusCode).json(result);
    },

    updateProductQuantity: async function (req, res) {
        const { product, quantity, user } = req.body;

        const result = await cartService.updateProductQuantity(product, quantity, user);

        res.status(result.statusCode).json(result);
    }
}

module.exports = cartController;