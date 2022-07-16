import "./category-item.styles.scss";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    const navigate = useNavigate();
    const handleSelectCategory = () => {
        navigate(`/shop/${title.toLowerCase()}`);
    };
    return (
        <div className="category-item-container" onClick={handleSelectCategory}>
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    );
};

export default CategoryItem;
