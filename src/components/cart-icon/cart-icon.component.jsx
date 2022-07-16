import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const { quantitySum, cartOpen, setCartOpen } = useContext(CartContext);
    return (
        <CartIconContainer onClick={() => setCartOpen(!cartOpen)}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{quantitySum}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
