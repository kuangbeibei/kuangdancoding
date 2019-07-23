import React from "react";

import "./Loading.scss"

export default function (props) {
    const {
        loadingActive
    } = props;

    return (
        <div className={`loading-wrap ${loadingActive ? "" : "has-opacity"}`}>
            <div className={`lds-ripple ${loadingActive ? "" : "has-opacity"}`}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}