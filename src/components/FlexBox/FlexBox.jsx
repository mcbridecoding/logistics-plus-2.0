import React from "react";

function FlexBox(props) {
    return (
        <div
            style={{
                alignItems: props.alignItems,
                alignSelf: props.alignSelf,
                display: "flex",
                gap: props.gap,
                flexDirection: props.direction,
                justifyContent: props.justify,
                padding: props.padding
            }}
        >
            {props.children}
        </div>
    )
}

function FlexStartColumn(props) {
    return (
        <div
            className={props.class}
            style={{
                alignItems: "flex-start",
                alignSelf: "stretch",
                display: "flex",
                gap: props.gap,
                flexDirection: "column",
                flex: "1 1 auto",
                justifyContent: "flex-start",
            }}
        >
            {props.children}
        </div>
    )
}

function FlexStartRow(props) {
    return (
        <div
            className={props.class}
            style={{
                alignItems: "flex-start",
                alignSelf: "stretch",
                display: "flex",
                gap: props.gap,
                flexDirection: "row",
                flex: "1 1 auto",
                justifyContent: "flex-start",
            }}
        >
            {props.children}
        </div>
    )
}

function FlexEndRow(props) {
    return (
        <div
            className={props.class}
            style={{
                alignItems: "flex-end",
                alignSelf: "stretch",
                display: "flex",
                gap: props.gap,
                flexDirection: "row",
                flex: "1 1 auto",
                justifyContent: "flex-end",
            }}
        >
            {props.children}
        </div>
    )
}

function SplitPanel(props) {
    return (
        <div
            className={props.class}
            style={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
                flex: "1 1",
                gap: "15px",
                justifyContent: "flex-start",
            }}
        >
            {props.children}
        </div>
    )
}

export default FlexBox;

export { FlexStartColumn, FlexStartRow, SplitPanel, FlexEndRow }
