import { ProductCartContainer, Footer, Name, Price } from "./product-card.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({ cart, product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(cart, product));

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;
