import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./rootSaga";

import { rootReducer } from "./rootReducer";

// const loggerMiddleware = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }
//     console.log("type: ", action.type);
//     console.log("payload: ", action.payload);
//     console.log("currentState: ", store.getState());

//     next(action);

//     console.log("next state: ", store.getState());
// };

const logger = createLogger({
    collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

const middlewareArray = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(middlewareArray),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: undefined,
});

sagaMiddleware.run(rootSaga);
