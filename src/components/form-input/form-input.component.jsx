import { Fragment } from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Fragment>
            <div className="group">
                <input className="form-input" {...otherProps} />
                {label && (
                    <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>{label}</label>
                )}
            </div>
        </Fragment>
    );
};

export default FormInput;
