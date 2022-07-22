import { USER_ACTION_TYPE } from "./user.types";

import { createAction } from "@reduxjs/toolkit";

export const setCurrentUser = createAction(USER_ACTION_TYPE.SET_CURRENT_USER, (payload) => {
    return { payload };
});
