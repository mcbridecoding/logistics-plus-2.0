import React from "react";
import "./Input.css";

function Input(props) {
    const { label, onChange, size, ...inputProps } = props;
    return (
        <div className={size}>
            <label>{props.label}</label>
            <input
                {...inputProps}
                onChange={onChange}
            />
        </div>
    )
}

export default Input