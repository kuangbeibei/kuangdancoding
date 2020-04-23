import React from "react";

import "./Loading.scss";

import loading from "../../../img/loading.gif"

export default function (props) {
    const {
        loadingActive
    } = props;

    return (
        <div className={`loading-wrap ${loadingActive ? "" : "has-opacity"}`}>
            <img src={loading} />
        </div>
    )
}