import { createReducer } from "@reduxjs/toolkit";
import { fetchCategories } from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

const INITIAL_STATE = {
    categories: [],
    isLoaded: false,
    error: null,
};

export const categoriesReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        // .addCase(fetchCategories.pending, (state) => {
        //     return { ...state, isLoading: true };
        // })
        // .addCase(fetchCategories.fulfilled, (state, action) => {
        //     return { ...state, isLoading: false, categories: action.payload };
        // })
        // .addCase(fetchCategories.rejected, (state, action) => {
        //     return { ...state, isLoading: false, error: action.payload };
        // })
        .addCase(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, (state) => {
            return { ...state, isLoading: true };
        })
        .addCase(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, (state, action) => {
            return { ...state, isLoading: false, categories: action.payload };
        })
        .addCase(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, (state, action) => {
            return { ...state, isLoading: false, error: action.payload };
        });
});
