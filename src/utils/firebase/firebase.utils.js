import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "clkothingscurse.firebaseapp.com",
    projectId: "clkothingscurse",
    storageBucket: "clkothingscurse.appspot.com",
    messagingSenderId: "XXXXXXXXXXXXX",
    appId: "1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX6",
};

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj);
    });

    await batch.commit();
    console.log("addCollectionAndDocuments - done");
};

export const getCategoriesAndDocuments = async (table) => {
    const collectionRef = collection(db, table);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordAuth = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    return signOut(auth);
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((res, rej) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                res(userAuth);
            },
            rej
        );
    });
};
