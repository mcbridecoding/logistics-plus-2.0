import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
    const { label, onChange, size, ...inputProps } = props;
    return (
        <div className="checkbox">    
            <input
                { ...inputProps }
                onChange={onChange}
            />
            <label>{props.label}</label>
        </div>
    )
}

export default Checkbox;