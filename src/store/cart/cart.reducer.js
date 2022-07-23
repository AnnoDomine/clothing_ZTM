import { createReducer } from "@reduxjs/toolkit";
import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    cart: [],
    quantitySum: 0,
    priceSum: 0,
    cartOpen: false,
};

export const cartReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(CART_ACTION_TYPES.SET_IS_CART_OPEN, (state, action) => {
            return { ...state, cartOpen: action.payload };
        })
        .addCase(CART_ACTION_TYPES.SET_CART_ITEMS, (state, action) => {
            return { ...state, cart: action.payload };
        });
});
