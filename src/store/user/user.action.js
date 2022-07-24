import { USER_ACTION_TYPE } from "./user.types";

import { createAction } from "@reduxjs/toolkit";

export const setCurrentUser = createAction(USER_ACTION_TYPE.SET_CURRENT_USER, (payload) => {
    return { payload };
});

export const checkUserSession = createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);

// SIGN IN
export const googleSignInStart = createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);

export const emailSignInStart = createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, ({ email, password }) => {
    return { payload: { email, password } };
});

export const signInSuccess = createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, (payload) => {
    return { payload };
});

export const signInFailed = createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, (payload) => {
    return { payload };
});

// SIGN UP
export const signUpStart = createAction(USER_ACTION_TYPE.SIGN_UP_START, ({ email, password, displayName }) => {
    return { payload: { email, password, displayName } };
});

export const signUpSuccess = createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, ({ user, additionalDetails }) => {
    return { payload: { user, additionalDetails } };
});

export const signUpFailed = createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, (payload) => {
    return { payload };
});

// SIGN OUT
export const signOutStart = createAction(USER_ACTION_TYPE.SIGN_OUT_START);

export const signOutSuccess = createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);

export const signOutFailed = createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, (payload) => {
    return { payload };
});
