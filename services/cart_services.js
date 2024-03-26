const cartModel = require('../model/cart_model');
const utils = require('../utils/utils');

const cartService = {
    addToCart: async function (product, user, quantity) {
        try {
            let foundCart = await cartModel.findOne({ user: user }).populate("products.product");

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
                    data: newCart.products,
                    message: 'Products added to cart',
                    error: null
                };
            }

            // Delete item if already exists
            await cartModel.findOneAndUpdate(
                {user: user, "products.product": product},
                {$pull: {products: {"product": product}}}
            )

            // If cart is already exists.
            foundCart = await cartModel.findOneAndUpdate(
                { user: user },
                { $push: { products: { product: product, quantity: quantity } } },
                {new: true}
            ).populate("products.product");

            return {
                status: true,
                statusCode: 200,
                data: foundCart.products,
                message: 'Added to Cart',
                error: null
            };

        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    removeFromCart: async function (product, user) {
        try {
            const updateCart = await cartModel.findOneAndUpdate(
                { user: user },
                { $pull: { products: { product: product } } },
                {new: true}
            ).populate("products.product");

            return {
                status: true,
                statusCode: 200,
                data: updateCart,
                message: "Product deleted from cart.",
                error: null
            }
        } catch (e) {
            return utils.getErrorResponse(e, 500);
        }
    },

    getCartForUser: async function (userId) {
        try {
            const foundCart = await cartModel.findOne({
                user: userId
            }).populate("products.product");

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
                data: foundCart.products,
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