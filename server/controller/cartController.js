const Cart = require("../models/cartModel");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");

class CartController {
    constructor() {
        this.calcTotalCartPrice = this.calcTotalCartPrice.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.getLoggedUserCart = this.getLoggedUserCart.bind(this);
        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.clearCart = this.clearCart.bind(this);
        this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this);
        this.applyCoupon = this.applyCoupon.bind(this);
    }

    calcTotalCartPrice(cart) {
        let totalPrice = 0;
        cart.cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        cart.totalCartPriceAfterDiscount = undefined;
        return totalPrice;
    }

    async addProductToCart(req, res, next) {
        const { productId, color } = req.body;

        const product = await Product.findById(productId);
        // Get cart for logged user
        let cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            // Create cart for logged user with product
            cart = await Cart.create({
                user: req.user._id,
                cartItems: [
                    { product: productId, color, price: product.price },
                ],
            });
        } else {
            // product exists in cart, update product quantity
            const productIndex = cart.cartItems.findIndex(
                (item) =>
                    item.product.toString() === productId &&
                    item.color === color
            );
            if (productIndex > -1) {
                const cartItem = cart.cartItems[productIndex];
                cartItem.quantity += 1;
            } else {
                // product not exist in cart, push product to cartItems array
                cart.cartItems.push({
                    product: productId,
                    color,
                    price: product.price,
                });
            }
        }

        // Calculate total cart price
        cart.totalCartPrice = this.calcTotalCartPrice(cart);

        await cart.save();

        res.status(200).json({
            status: "Success",
            message: "Product added to cart successfully",
            data: cart,
        });
    }

    async getLoggedUserCart(req, res, next) {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart)
            return next(
                new ApiError(
                    `There is no cart for this user id ${req.user._id}`,
                    404
                )
            );
        res.status(200).json({
            status: "Success",
            numOfCartItems: cart.cartItems.length,
            data: cart,
        });
    }

    async deleteCartItem(req, res, next) {
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                // pop item form array
                $pull: { cartItems: { _id: req.params.itemId } },
            },
            { new: true }
        );
        cart.totalCartPrice = this.calcTotalCartPrice(cart);
        cart.save();

        res.status(200).json({
            status: "Success",
            numOfCartItems: cart.cartItems.length,
            data: cart,
        });
    }

    async clearCart(req, res, next) {
        await Cart.findOneAndDelete({ user: req.user._id });
        res.status(204).send();
    }

    async updateCartItemQuantity(req, res, next) {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return next(
                new ApiError(`There is no cart for user ${req.user._id}`, 404)
            );
            // throw new ApiError(`There is no cart for user ${req.user._id}`, 404);
            // return Promise.reject(
            //     new ApiError(`There is no cart for user ${req.user._id}`, 404)
            // );
        }
        const itemIndex = cart.cartItems.findIndex(
            (item) => item._id.toString() === req.params.itemId
        );
        if (itemIndex > -1) {
            cart.cartItems[itemIndex].quantity = quantity;
        } else {
            return next(
                new ApiError(
                    `There is no item for the id ${req.params.itemId}`,
                    404
                )
            );
        }
        cart.totalCartPrice = this.calcTotalCartPrice(cart);
        await cart.save();
        res.status(200).json({
            status: "success",
            numOfCartItems: cart.cartItems.length,
            data: cart,
        });
    }

    async applyCoupon(req, res, next) {
        // 1- get coupon based on coupon name
        const coupon = await Coupon.findOne({
            name: req.body.coupon,
            expire: { $gt: Date.now() },
        });

        if (!coupon) return next(new ApiError(`Coupon invalid or expired`));

        // 2- get logged user cart to get
        const cart = await Cart.findOne({ user: req.user._id });

        const totalPrice = cart.totalCartPrice;

        cart.totalCartPriceAfterDiscount = (
            totalPrice -
            (totalPrice * coupon.discount) / 100
        ).toFixed(2);

        await cart.save();

        res.status(200).json({
            status: "success",
            numOfCartItems: cart.cartItems.length,
            data: cart,
        });
    }
}

module.exports = new CartController();
