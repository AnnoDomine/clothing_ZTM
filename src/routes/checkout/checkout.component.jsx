import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/cheout-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const headerTitles = ["Product", "Description", "Quantity", "Price", "Remove"];

const Checkout = () => {
    const { cart, priceSum } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                {headerTitles.map((value, index) => (
                    <div className="header-block" key={index}>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            {cart.map((item, index) => (
                <CheckoutItem key={index} cartItem={item} />
            ))}
            <div className="total">Total: ${priceSum}</div>
        </div>
    );
};

export default Checkout;
