import React from "react";
import "./FolderPanel.css";

function FolderPanel(props) {
    return (
        <div className={props.class}>
            {props.children}
        </div>
    )
}

export default FolderPanel;