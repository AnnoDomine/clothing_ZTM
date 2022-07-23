import { createAction } from "@reduxjs/toolkit";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const setCategoriesMap = createAction(CATEGORIES_ACTION_TYPE.GET_CATEGORIES_AND_DOCUMENTS, (payload) => {
    return { payload };
});
