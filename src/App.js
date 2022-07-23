import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentification from "./routes/authentification/authentification.component";
import Checkout from "./routes/checkout/checkout.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscripe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscripe;
    }, [dispatch]);

    return (
        <Routes>
            <Route path={"/"} element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentification />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
