import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const fetchCategories = createAsyncThunk(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES, async () => {
    try {
        const res = await getCategoriesAndDocuments();
        return res;
    } catch (error) {
        return error;
    } finally {
    }
});

export const fetchCategoriesStart = createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, (payload) => {
    return { payload };
});
export const fetchCategoriesFailed = createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, (payload) => {
    return { payload };
});
