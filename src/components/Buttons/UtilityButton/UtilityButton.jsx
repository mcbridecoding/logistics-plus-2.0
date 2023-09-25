import React, { useState } from "react";
import "./UtilityButton.css"

function UtilityButton(props) {
    const [isHovered, setHover] = useState(false);

    function handleMouseOver() {
        setHover(!isHovered);
    }

    return (
        <button
            className={isHovered ? "utility-button utility-hover" : "utility-button"}
            type={props.type}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
            onClick={props.onClick}
            style={props.style}
        >
            {props.img}
            {props.label}
        </button>
    );
}

function SubmitButton(props) {
    const [isHovered, setHover] = useState(false);

    function handleMouseOver() {
        setHover(!isHovered);
    }

    return (
        <button
            className={isHovered ? "utility-button utility-hover" : "utility-button"}
            type="submit"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
            style={props.style}
        >
            {props.img}
            {props.label}
        </button>
    );
}

export default UtilityButton;

export { SubmitButton }