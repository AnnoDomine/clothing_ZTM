import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as ClothingsLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// import "./navigation.styles.scss";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";
import { selectCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const cartOpen = useSelector(selectCartOpen);

    const handleSignOut = () => {
        dispatch(signOutStart());
    };

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={"/"}>
                    <ClothingsLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to={"shop"}>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as={"span"} onClick={handleSignOut}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to={"auth"}>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinksContainer>
                {cartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
