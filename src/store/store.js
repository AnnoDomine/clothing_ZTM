import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

const persisitConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
};

const persistedReducer = persistReducer(persisitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [loggerMiddleware],
    devTools: true,
    preloadedState: undefined,
});

export const persistor = persistStore(store);
