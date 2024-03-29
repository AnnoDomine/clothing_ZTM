import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { categoriesSelector, selectCategoriesIsLoading } from "../../store/categories/category.selector";

import { CategoryContainer, Title } from "./category.styles";

import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(categoriesSelector);
    const cart = useSelector(selectCartItems);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const navigate = useNavigate();

    const [products, setProducts] = useState(categoriesMap[category]);

    const handleBackArrow = () => {
        navigate("/shop");
    };

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title onClick={handleBackArrow}>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {products &&
                        products.map((product) => <ProductCard key={product.id} cart={cart} product={product} />)}
                </CategoryContainer>
            )}
        </Fragment>
    );
};

export default Category;
