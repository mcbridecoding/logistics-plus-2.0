import React from "react";
import "./TextArea.css";

function TextArea(props) {
    const { label, onChange, size, ...inputProps } = props;
    return (
        <div className={size}>
            <label>{props.label}</label>
            <textarea
                { ...inputProps }
                onChange={onChange}
            />
        </div>
    )
}

export default TextArea;