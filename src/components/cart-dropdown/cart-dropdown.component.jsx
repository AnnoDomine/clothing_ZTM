import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);

    const navigateToCheckout = () => navigate("/checkout");

    return (
        <CartDropdownContainer>
            <CartItems>
                {cart.length > 0 ? (
                    cart.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={navigateToCheckout}>
                Checkout
            </Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
