import { createSelector } from "@reduxjs/toolkit";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const categoriesSelector = createSelector([selectCategories], (categories) =>
    categories.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);
