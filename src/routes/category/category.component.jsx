import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { categoriesSelector } from "../../store/categories/category.selector";

import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(categoriesSelector);
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
            <CategoryContainer>
                {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;
