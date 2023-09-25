import React, { useState } from "react";
import "./Heading.css"
import UtilityButton from "../Buttons/UtilityButton/UtilityButton";

function Heading(props) {
    return (
        <div className="heading">
            {props.img}
            <h1>{props.title}</h1>
        </div>
    )
}

function HeadingSmall(props) {
    const [clicked, setClick] = useState(false);

    function handleClick() {
        setClick(!clicked)
        props.toggleReadOnly();
    
    }

    return (
        <div className="heading-small">
            <h1>{props.title}</h1>
            <div onClick={handleClick} className="animate-right" style={{ "display": clicked ? "none" : "block" }}>{props.secondaryTitle}</div>
            <div className="button-panel animate-right" style={{ "display": clicked ? "flex" : "none" }}>
                <UtilityButton type="submit" label="Submit" />
                <UtilityButton onClick={handleClick} type="button" label="Cancel" />
            </div>
        </div>
    )
}

function FormHeading(props) {
    return (
        <div 
        className={`form-heading ${props.style}`}
        >
            <h2>{props.title}</h2>
            <button
                type="button"
                onClick={() => {props.onClick()}}
            >{props.headingControl}</button>
        </div>
    )
}

export default Heading;

export { HeadingSmall, FormHeading }