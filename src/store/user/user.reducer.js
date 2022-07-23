import { USER_ACTION_TYPE } from "./user.types";

import { createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: undefined,
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
    builder.addCase(USER_ACTION_TYPE.SET_CURRENT_USER, (state, action) => {
        return { ...state, currentUser: action.payload };
    });
});
