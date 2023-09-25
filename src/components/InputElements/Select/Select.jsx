import React from "react";
import "./Select.css";

function Select(props) {
    const { label, onChange, size, style, ...inputProps } = props;
    return (
        <div className={size}>
            <label style={style}>{props.label}</label>
            <select
                { ...inputProps }
                onChange={onChange}
            >
                {props.children}
            </select>
        </div>
    )
}

export default Select;