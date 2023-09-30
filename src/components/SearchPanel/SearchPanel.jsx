import React from "react";
import "./SearchPanel.css";

function SearchPanel(props) {
    return (
        <div className="search-frame">
            <div className="search-header">{props.title}</div>
            <div className="search-inputs">
                {props.children}
            </div>
        </div>
    )
}

export default SearchPanel;
