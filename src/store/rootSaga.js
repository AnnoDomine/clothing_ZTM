import { all, call, spawn } from "redux-saga/effects";
import { categoriesSaga } from "./categories/category.saga";
import { sagaErrorHandling } from "./sagas/sagaErrorHandling";
import { userSaga } from "./user/user.saga";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function* rootSaga() {
    const sagas = [categoriesSaga, userSaga];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        sagaErrorHandling({ saga: saga, error: e });
                    }
                }
            })
        )
    );
}
