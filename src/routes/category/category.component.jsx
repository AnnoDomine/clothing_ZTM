import { useContext, useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./category.styles.scss";

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
                <span className="category-preview-title" onClick={handleBackArrow}>
                    {category.toUpperCase()}
                </span>
            </h2>
            <div className="category-container">
                {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        </Fragment>
    );
};

export default Category;
