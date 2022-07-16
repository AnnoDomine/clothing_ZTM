import { DirectoryContainer } from "./directory.styles";
import CategoryItem from "../category-item/category-item.component";

import categories from "../../utils/categories.json";

const Directory = () => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </DirectoryContainer>
    );
};

export default Directory;
