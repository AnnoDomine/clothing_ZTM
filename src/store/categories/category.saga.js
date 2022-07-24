import { call, takeLatest, all, put } from "redux-saga/effects";

import { CATEGORIES_ACTION_TYPE } from "./category.types";
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.action";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export function* fetchCategoriesAsync() {
    try {
        const res = yield call(getCategoriesAndDocuments, "categories");
        yield put(fetchCategoriesSuccess(res));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    } finally {
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}
