import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);

    const navigateToCheckout = () => navigate("/checkout");

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cart.length > 0 && cart.map((item, index) => <CartItem key={index} cartItem={item} />)}
            </div>
            <Button onClick={navigateToCheckout}>Checkout</Button>
        </div>
    );
};

export default CartDropdown;
