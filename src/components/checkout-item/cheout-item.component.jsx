import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;
    const { addItemToCart, reduceItemFromCart, removeItemFromCart } = useContext(CartContext);

    const addItemInCart = () => addItemToCart(cartItem);

    const reduceItemInCart = () => reduceItemFromCart(cartItem);

    const removeItemInCart = () => removeItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="name">{name}</div>
            <div className="quantity">
                <div className="arrow" onClick={reduceItemInCart}>
                    {"<"}
                </div>
                <div className="value">{quantity}</div>
                <div className="arrow" onClick={addItemInCart}>
                    {">"}
                </div>
            </div>
            <div className="price">${price}</div>
            <div className="remove-button" onClick={removeItemInCart}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
