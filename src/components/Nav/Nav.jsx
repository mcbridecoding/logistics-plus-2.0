import React from "react";
import "./Nav.css";

function Nav(props) {
    return (
        <div className="nav-panel">
            <div className="nav-button-panel">
                {props.children}
            </div>
        </div>
    );
}

function NavSubButtonPanel(props) {
    return (
        <div
            className="sub-menu-panel fade-in"
            style={props.style}
        >
            {props.children}
        </div>
    );
}

export default Nav

export { NavSubButtonPanel };