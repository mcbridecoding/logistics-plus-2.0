import React, { useState } from "react";
import "./Tabs.css";

function Tabs(props) {
    const { onClick, ...tabProps } = props;
    const [isHovered, setHover] = useState(false);

    function handleMouseOver() {
        setHover(!isHovered);
    }

    return (
        <button
            type="button"
            className={isHovered ? "tab tab-hover" : "tab"}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
            {...tabProps}
        >
            {props.label}
        </button>
    )
}

export default Tabs;