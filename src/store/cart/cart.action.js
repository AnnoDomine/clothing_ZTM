import { createAction } from "@reduxjs/toolkit";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((value) => value.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    } else {
        return [
            ...cartItems,
            {
                ...productToAdd,
                quantity: 1,
            },
        ];
    }
};

const reduceCartItem = (cartItems, productToReduce) => {
    if (productToReduce.quantity === 1) {
        return removeCartItem(cartItems, productToReduce);
    } else {
        return cartItems.map((cartItem) =>
            cartItem.id === productToReduce.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
    }
};

const removeCartItem = (cartItems, productToRemove) =>
    cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

export const setCartOpen = createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, (payload) => {
    return { payload };
});

export const setCartItems = createAction(CART_ACTION_TYPES.SET_CART_ITEMS, (payload) => {
    return { payload };
});

export const addItemToCart = (cart, productToAdd) => setCartItems(addCartItem(cart, productToAdd));

export const reduceItemFromCart = (cart, productToReduce) => setCartItems(reduceCartItem(cart, productToReduce));

export const removeItemFromCart = (cart, productToRemove) => setCartItems(removeCartItem(cart, productToRemove));
