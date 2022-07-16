import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithEmailAndPasswordAuth,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { useState } from "react";
import "./sign-in-form.style.scss";

const defaultFormFields = {
    email: "",
    password: "",
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const SignInWithGoogle = async () => {
        console.log("sign in with google");
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("sign in with mail");
        try {
            const { user } = await signInWithEmailAndPasswordAuth(email, password);
            await createUserDocumentFromAuth(user);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("The Password is wrong. Did you forget your Password?");
                    break;
                case "auth/user-not-found":
                    alert("The Email is unknown. Did you have a typo?");
                    break;
                default:
                    console.error("error sing in user", error.message);
                    break;
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"E-Mail"}
                    type={"email"}
                    required
                    onChange={handleChange}
                    name={"email"}
                    value={email}
                />
                <FormInput
                    label={"Password"}
                    type={"password"}
                    required
                    onChange={handleChange}
                    name={"password"}
                    value={password}
                />
                <div className="sign-in-buttons">
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
                        Sign In
                    </Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>
                        Google SignIn
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
