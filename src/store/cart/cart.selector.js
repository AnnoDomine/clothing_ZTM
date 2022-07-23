import { createSelector } from "@reduxjs/toolkit";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cart);
export const selectCartOpen = createSelector([selectCartReducer], (cart) => cart.cartOpen);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((prevValue, value) => prevValue + value.quantity * value.price, 0)
);
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((prevValue, value) => prevValue + value.quantity, 0)
);
