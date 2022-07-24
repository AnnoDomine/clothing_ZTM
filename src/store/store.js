import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
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

// const persisitConfig = {
//     key: "root",
//     storage,
//     whitelist: ["cart"],
// };

const logger = createLogger({
    collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

// const persistedReducer = persistReducer(persisitConfig, rootReducer);

const middlewareArray = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(middlewareArray),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: undefined,
});

sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
