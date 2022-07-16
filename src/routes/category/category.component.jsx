import { useContext, useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
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
            <h2>
                <Title onClick={handleBackArrow}>{category.toUpperCase()}</Title>
            </h2>
            <CategoryContainer>
                {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;
