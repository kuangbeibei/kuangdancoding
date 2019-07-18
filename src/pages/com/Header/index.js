import React from 'react'
import { NavLink } from "react-router-dom";
import "./Header.scss"

const sideMenu = (innerWidth) => {
    if (innerWidth < 960) {
        return (
            <React.Fragment>
                <button className="svg-btn" style = {{background: 'transparent', border: '0 none'}}>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </button>
            </React.Fragment>
        )
    } else {
        return null
    }
}


export default function (props) {
    const {
        windowWidth,
        scrollTop
    } = props;

    const headerBackground = function () {
        if (scrollTop >= 160) {
            const opacity = Number(scrollTop/300)
            return {
                background: `rgba(255, 255, 255, ${opacity})`
            }
        }
    }

    return (
        <>
            <header
                style = {headerBackground()}
            >
                <div 
                    className={`header ${scrollTop > 160 ? "scrollChange" : ''}`} 
                >

                    <div className="info">
                        <NavLink to="/blog" activeClassName="selected">{`Kuang's blog`}</NavLink>
                    </div>

                    <ul>
                        <li>
                            <NavLink to="/" exact activeClassName="selected">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" activeClassName="selected">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/articles" activeClassName="selected">Articles</NavLink>
                        </li>
                    </ul>
                    
                    {/* 小屏显示的sideMenu */}
                    {
                        sideMenu(windowWidth)
                    }
                </div>

            </header>

            <div className="bg-pic"></div>
        </>
    )
}