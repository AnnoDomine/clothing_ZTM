import { createAsyncThunk } from "@reduxjs/toolkit";
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
