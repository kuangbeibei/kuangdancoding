/**
 * 渲染主体结构通用模板
 */

import React from "react"

import "./Main.scss"

export default function (props) {
    const {
        Component
    } = props;

    return (
        <main>
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <Component />
                    </div>
                </div>
            </div>
        </main>
    )
}