/**
 * 渲染主体结构通用模板
 */

import React, {} from "react"

import "./Main.scss"


// let y;

export default function (props) {
    const {
        Component,
        // scrollTop,
        match,
        history
    } = props;

    // console.log('我在main里面拿到的scrollTop ,', scrollTop);

    // const mainTranslateY = () => {

    //     if (scrollTop > 0 && scrollTop <= 400) {
    //         y = parseInt(scrollTop/4)
    //     } 
    //     return {
    //         transform: `translate(0, -${y}px)`
    //     }
    // }

    // requestAnimationFrame(() => {
    //     if (scrollTop > 0 && scrollTop <= 400) {
    //         y = parseInt(scrollTop/4);
    //     }
    // })

    return (
        <main>
            <div 
                className="main-container"
                // style = {{transform: "translate(0, -" + y +"px)"}}
                // style = {mainTranslateY()}
            >
                <div className="wrap">
                    <div className="content">
                        <Component 
                            match = {match}
                            history = {history}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}