import React, { useState } from "react";
import './NavButton.css';

function NavButton(props) {

    const [isHovered, setHover] = useState(false);

    function handleMouseOver() {
        setHover(!isHovered);
    }

    return (
        <a
            href={props.path}
            className={isHovered ? "nav-button nav-hover" : "nav-button"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
        >
            {props.img}
            {props.label}
        </a>
    );
}

export default NavButton;