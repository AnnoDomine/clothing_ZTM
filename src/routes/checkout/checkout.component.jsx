import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/cheout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";

const headerTitles = ["Product", "Description", "Quantity", "Price", "Remove"];

const Checkout = () => {
    // const { cart, priceSum } = useSelector(() => ({ cart: selectCartItems, priceSum: selectCartTotal }));

    const cart = useSelector(selectCartItems);
    const priceSum = useSelector(selectCartTotal);

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
                <CheckoutItem key={index} cartItems={cart} cartItem={item} />
            ))}
            <Total>Total: ${priceSum}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
};

export default Checkout;
