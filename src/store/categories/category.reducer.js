import { createReducer } from "@reduxjs/toolkit";
import { setCategoriesMap } from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

const INITIAL_STATE = {
    categoriesMap: {},
};

export const categoriesReducer = createReducer(INITIAL_STATE, (builder) => {
    builder.addCase(CATEGORIES_ACTION_TYPE.GET_CATEGORIES_AND_DOCUMENTS, (state, action) => {
        return { ...state, categoriesMap: action.payload };
    });
});
