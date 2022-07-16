import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import { useNavigate } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate();
    const handleSelectCategory = () => {
        navigate(`/shop/${title.toLowerCase()}`);
    };
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title onClick={handleSelectCategory}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {products
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
