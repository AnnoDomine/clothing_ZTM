import { USER_ACTION_TYPE } from "./user.types";

import { createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: undefined,
    isLoading: false,
    error: null,
};

// export const userReducer = (state = INITIAL_STATE, action) => {
//     const { type, payload } = action;
//     console.log(action);
//     switch (type) {
//         case USER_ACTION_TYPE.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser: payload,
//             };
//         default:
//             return state;
//     }
// };

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(USER_ACTION_TYPE.SIGN_IN_SUCCESS, (state, action) => {
            return { ...state, currentUser: action.payload, isLoading: false, error: null };
        })
        .addCase(USER_ACTION_TYPE.SIGN_IN_FAILED, (state, action) => {
            return { ...state, error: action.payload, isLoading: false };
        })
        .addCase(USER_ACTION_TYPE.SIGN_OUT_SUCCESS, (state) => {
            return { ...state, currentUser: null, isLoading: false, error: null };
        })
        .addCase(USER_ACTION_TYPE.SIGN_OUT_FAILED, (state, action) => {
            return { ...state, error: action.payload, isLoading: false };
        });
});
