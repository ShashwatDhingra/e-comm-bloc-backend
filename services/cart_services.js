const cartModel = require('../model/cart_model');
const utils = require('../utils/utils');

const cartService = {
    addToCart: async function (product, user, quantity) {
        try {
            const foundCart = await cartModel.findOne({ user: user });

            if (!foundCart) {
                const newCart = new cartModel({ user: user });
                newCart.products.push({
                    product: product,
                    quantity: quantity
                });
                await newCart.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Products added to cart',
                    error: null
                };
            }

            // If cart is already exists.

            await cartModel.findOneAndUpdate(
                { user: user },
                { $push: { products: { product: product, quantity: quantity } } }
            );

            return {
                status: true,
                statusCode: 200,
                message: 'Updated Cart',
                error: null
            };

        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    removeFromCart: async function (product, user) {
        try {
            await cartModel.findOneAndUpdate(
                { user: user },
                { $pull: { products: { product: product } } }
            );

            return {
                status: true,
                statusCode: 200,
                message: "Product deleted from cart.",
                error: null
            }
        } catch (e) {
            utils.getErrorResponse(e, 500);
        }
    },

    getCartForUser: async function (userId) {
        try {
            const foundCart = await cartModel.find({
                user: userId
            });

            if (!foundCart) {
                return {
                    status: true,
                    statusCode: 404,
                    message: "Cart not found.",
                    error: null
                }
            }

            return {
                status: true,
                statusCode: 200,
                data: foundCart,
                message: "Successfully fetched and returned the cart",
                error: null
            }
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    updateProductQuantity: async function (product, quantity, user) {
        try {
            const foundCart = await cartModel.findOne({
                user
            });


            const cartProducts = foundCart.products;

            cartProducts.find(function (element) {
                if (element.product == product) {
                    element.quantity = quantity
                }
            });

            await foundCart.save();

            return {
                status: true,
                statusCode: 200,
                message: "Cart Updated Successfully",
                error: null
            };

        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    }
}
module.exports = cartService;