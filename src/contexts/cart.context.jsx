import { useState, createContext } from "react";

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
    setCartOpen: () => {},
    addItemToCart: (productToAdd) => {},
    reduceItemFromCart: (productToDecrease) => {},
    removeItemFromCart: (productToRemove) => {},
    quantitySum: 0,
    priceSum: 0,
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const quantitySum = cart.reduce((prevValue, value) => prevValue + value.quantity, 0);
    const priceSum = cart.reduce((prevValue, value) => prevValue + value.quantity * value.price, 0);

    const addItemToCart = (productToAdd) => {
        setCart(addCartItem(cart, productToAdd));
    };

    const reduceItemFromCart = (productToReduce) => {
        setCart(reduceCartItem(cart, productToReduce));
    };

    const removeItemFromCart = (productToRemove) => {
        setCart(removeCartItem(cart, productToRemove));
    };

    const value = {
        cart,
        addItemToCart,
        reduceItemFromCart,
        removeItemFromCart,
        cartOpen,
        setCartOpen,
        quantitySum,
        priceSum,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
