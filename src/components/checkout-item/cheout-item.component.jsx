import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;
    const { addItemToCart, reduceItemFromCart, removeItemFromCart } = useContext(CartContext);

    const addItemInCart = () => addItemToCart(cartItem);

    const reduceItemInCart = () => reduceItemFromCart(cartItem);

    const removeItemInCart = () => removeItemFromCart(cartItem);

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
