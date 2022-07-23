import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    console.log("next state: ", store.getState());
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware],
    devTools: true,
    preloadedState: undefined,
});
