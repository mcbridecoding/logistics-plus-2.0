import React, { useState } from "react";
import "./SubMenuButton.css";

function SubMenuButton(props) {
    const [isHovered, setHover] = useState(false);

    function handleMouseOver() {
        setHover(!isHovered);
    }

    return (
        <button
            className={isHovered ? "sub-menu-button sub-menu-hover" : "sub-menu-button"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
            type="button"
            onClick={() => props.onClick()}
        >
            {props.img}
            {props.label}
        </button>
    )
}

export default SubMenuButton;