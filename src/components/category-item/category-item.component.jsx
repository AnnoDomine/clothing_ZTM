import { BackgroundImage, Body, DirectoryItemContainer } from "./category-item.styles";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    const navigate = useNavigate();
    const handleSelectCategory = () => {
        navigate(`/shop/${title.toLowerCase()}`);
    };
    return (
        <DirectoryItemContainer onClick={handleSelectCategory}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default CategoryItem;
