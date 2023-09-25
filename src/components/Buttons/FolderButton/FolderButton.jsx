import React from "react";
import "./FolderButton.css";

function FolderButton(props) {
    return (
        <button
            className={props.class}
            type="button"
            onClick={props.onClick}
            style={props.visible}
        >
            {props.label}
        </button>
    )
}

export default FolderButton;