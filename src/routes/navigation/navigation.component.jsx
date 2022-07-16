import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as ClothingsLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// import "./navigation.styles.scss";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";
import { CartContext } from "../../contexts/cart.context";
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { cartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={"/"}>
                    <ClothingsLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to={"shop"}>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as={"span"} onClick={signOutUser}>
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
