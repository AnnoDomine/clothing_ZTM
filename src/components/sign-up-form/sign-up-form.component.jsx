import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.style";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPasswort: "",
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPasswort } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPasswort) {
            alert("Passwords do not match");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
        } finally {
            resetFormFields();
        }
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    return (
        <Fragment>
            <SignUpContainer>
                <h2>Don't have an account?</h2>
                <span>SignUp with your EMail and Password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Display Name"
                        type={"text"}
                        required
                        onChange={handleChange}
                        name={"displayName"}
                        value={displayName}
                    />
                    <FormInput
                        label="E-Mail"
                        type={"email"}
                        required
                        onChange={handleChange}
                        name={"email"}
                        value={email}
                    />
                    <FormInput
                        label="Password"
                        type={"password"}
                        required
                        onChange={handleChange}
                        name={"password"}
                        value={password}
                    />
                    <FormInput
                        label="Confirm Password"
                        type={"password"}
                        required
                        onChange={handleChange}
                        name={"confirmPasswort"}
                        value={confirmPasswort}
                    />
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
                        Sign Up
                    </Button>
                </form>
            </SignUpContainer>
        </Fragment>
    );
};

export default SignUpForm;
