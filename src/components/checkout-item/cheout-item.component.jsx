import { useDispatch } from "react-redux";
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItems, cartItem }) => {
    const dispatch = useDispatch();
    const { name, imageUrl, quantity, price } = cartItem;

    const addItemInCart = () => dispatch(addItemToCart(cartItems, cartItem));

    const reduceItemInCart = () => dispatch(reduceItemFromCart(cartItems, cartItem));

    const removeItemInCart = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={reduceItemInCart}>{"<"}</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemInCart}>{">"}</Arrow>
            </Quantity>
            <BaseSpan>${price}</BaseSpan>
            <RemoveButton onClick={removeItemInCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
