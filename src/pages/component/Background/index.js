import React from "react"

import "./Background.scss"

import {
    useWindowScroll,
} from "hooks"

export default function () {
    const scrollTop = useWindowScroll();
    return (
        <div className="bg" style = {{transform: "translate(0, " + scrollTop +"px)"}}></div>
    )
}