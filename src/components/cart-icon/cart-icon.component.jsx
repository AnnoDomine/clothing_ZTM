import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useSelector } from "react-redux";
import { selectCartCount, selectCartOpen } from "../../store/cart/cart.selector";
import { setCartOpen } from "../../store/cart/cart.action";
import { useDispatch } from "react-redux";

const CartIcon = () => {
    const dispatch = useDispatch();
    const quantitySum = useSelector(selectCartCount);
    const cartOpen = useSelector(selectCartOpen);

    const openCart = () => dispatch(setCartOpen(!cartOpen));

    return (
        <CartIconContainer onClick={openCart}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{quantitySum}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
