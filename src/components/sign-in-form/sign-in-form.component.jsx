import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { useState } from "react";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.style";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: "",
    password: "",
};
const SignInForm = () => {
    const disptach = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const SignInWithGoogle = async () => {
        console.log("sign in with google");
        disptach(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("sign in with mail");
        disptach(emailSignInStart({ email, password }));
    };

    return (
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
                        Sign In
                    </Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>
                        Google SignIn
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
