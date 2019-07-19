/**
 * 渲染主体结构通用模板
 */

import React from "react"

import "./Main.scss"


let y;

export default function (props) {
    const {
        Component,
        scrollTop
    } = props;

    // console.log('我在main里面拿到的scrollTop ,', scrollTop);

    const mainTranslateY = () => {
        
        if (scrollTop > 0 && scrollTop <= 400) {
            y = parseInt(scrollTop/3)
        } 
        return {
            transform: `translate(0, -${y}px)`
        }
    }

    return (
        <main>
            <div 
                className="main-container"
                style = {mainTranslateY()}
            >
                <div className="wrap">
                    <div className="container">
                        <div className="content">
                            <Component />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}