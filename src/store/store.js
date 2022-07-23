import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

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

const persisitConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
};

const persistedReducer = persistReducer(persisitConfig, rootReducer);

const middlewareArray = [process.env.NODE_ENV !== "production" && logger];

export const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewareArray,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: undefined,
});

export const persistor = persistStore(store);
