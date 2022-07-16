import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/cheout-item.component";
import { CartContext } from "../../contexts/cart.context";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";

const headerTitles = ["Product", "Description", "Quantity", "Price", "Remove"];

const Checkout = () => {
    const { cart, priceSum } = useContext(CartContext);
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                {headerTitles.map((value, index) => (
                    <HeaderBlock key={index}>
                        <span>{value}</span>
                    </HeaderBlock>
                ))}
            </CheckoutHeader>
            {cart.map((item, index) => (
                <CheckoutItem key={index} cartItem={item} />
            ))}
            <Total>Total: ${priceSum}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;
