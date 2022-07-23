import { createReducer } from "@reduxjs/toolkit";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

const INITIAL_STATE = {
    categories: [],
};

export const categoriesReducer = createReducer(INITIAL_STATE, (builder) => {
    builder.addCase(CATEGORIES_ACTION_TYPE.GET_CATEGORIES_AND_DOCUMENTS, (state, action) => {
        return { ...state, categories: action.payload };
    });
});
