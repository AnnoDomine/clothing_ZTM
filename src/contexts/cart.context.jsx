import { createContext, useReducer } from "react";

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

// as the actual value you want to access
export const CartContext = createContext({
    cart: [],
    cartOpen: false,
    quantitySum: 0,
    priceSum: 0,
    setCartOpen: () => {},
    addItemToCart: (productToAdd) => {},
    reduceItemFromCart: (productToDecrease) => {},
    removeItemFromCart: (productToRemove) => {},
});

export const CART_ACTION_TYPE = {
    SET_OPEN_CART: "SET_OPEN_CART",
    SET_NEW_CART: "SET_NEW_CART",
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPE.SET_OPEN_CART:
            return {
                ...state,
                cartOpen: payload,
            };
        case CART_ACTION_TYPE.SET_NEW_CART:
            return { ...state, ...payload };
        default:
            throw new Error(`Unhandle type ${type} in cartReducer`);
    }
};

const INITIAL_STATE = {
    cart: [],
    quantitySum: 0,
    priceSum: 0,
    cartOpen: false,
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartQuantity = newCartItems.reduce((prevValue, value) => prevValue + value.quantity, 0);
        const newCartTotal = newCartItems.reduce((prevValue, value) => prevValue + value.quantity * value.price, 0);

        const payload = { cart: newCartItems, quantitySum: newCartQuantity, priceSum: newCartTotal };

        dispatch({ type: CART_ACTION_TYPE.SET_NEW_CART, payload });
    };

    const setCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPE.SET_OPEN_CART, payload: bool });
    };

    const { cart, quantitySum, priceSum, cartOpen } = state;

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cart, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const reduceItemFromCart = (productToReduce) => {
        const newCartItems = reduceCartItem(cart, productToReduce);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cart, productToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const value = {
        cart,
        cartOpen,
        quantitySum,
        priceSum,
        setCartOpen,
        addItemToCart,
        reduceItemFromCart,
        removeItemFromCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
