import { takeLatest, all, put, call } from "redux-saga/effects";

import { USER_ACTION_TYPE } from "./user.types";

import { signInSuccess, signInFailed, signUpFailed, signUpSuccess, signOutFailed, signOutSuccess } from "./user.action";

import {
    signInWithGooglePopup,
    signInWithEmailAndPasswordAuth,
    getCurrentUser,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInWithEmailAndPasswordAuth, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        switch (error.code) {
            case "auth/wrong-password":
                yield put(signInFailed("The Password is wrong. Did you forget your Password?"));
                alert("The Password is wrong. Did you forget your Password?");
                break;
            case "auth/user-not-found":
                yield put(signInFailed("The Email is unknown. Did you have a typo?"));
                alert("The Email is unknown. Did you have a typo?");
                break;
            default:
                yield put(signInFailed(`error sign in user. ${error}`));
                console.error("error sign in user", error);
                break;
        }
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            yield put(signInFailed("Email is already in use. Did you forget youre Password?"));
            alert("Email is already in use. Did you forget youre Password?");
        } else {
            yield put(signInFailed(`error creating user: ${error.message}`));
            console.error("error creating user", error.message);
        }
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess, (user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
