import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { categoriesSelector } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const { categoriesMap } = useSelector(categoriesSelector);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => (
                <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
            ))}
        </Fragment>
    );
};

export default CategoriesPreview;
