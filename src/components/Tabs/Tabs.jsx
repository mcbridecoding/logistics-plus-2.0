import React, { useState } from "react";
import "./Tabs.css";

function Tabs(props) {
    const { onClick } = props;
    const [isHovered, setHover] = useState(false);

    function handleMouseOver() {
        setHover(!isHovered);
    }

    return (
        <button
            type="button"
            className={isHovered ? `${props.class} tab tab-hover` : `tab ${props.class}`}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    )
}

export default Tabs;