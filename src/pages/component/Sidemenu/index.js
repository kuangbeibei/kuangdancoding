import React, {memo} from "react"
import {withRouter} from "react-router-dom"

import "./Side-menu.scss"

export default withRouter(memo(function (props) {
    const {
        sideMenuActive,
        hideSideMenu,
        history
    } = props;

    const clickLinkTo = path => {
        history.push(path);
        hideSideMenu();
    }

    return (
        <>
            <div className={`${sideMenuActive ? "side-menu-bg" : ""}`} onClick={() => {
                hideSideMenu()
            }}></div>
            <div className={`side-menu-wrap ${sideMenuActive ? "active" : ""}`}>
                <div className="side-menu">
                    <ul>
                        <li>
                            <div className="menu-item">
                                <button>
                                    <a href="https://www.instagram.com/danakuang/"><i className="fab fa-instagram"></i></a>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item">
                                <button>
                                    <a href="https://juejin.im/user/5ab45518f265da23914809c5/posts"><i className="fab fa-github"></i></a>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item">
                                <button>
                                    <a href="https://twitter.com/kuang51821034"><i className="fab fa-twitter"></i></a>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item" onClick = {() => {
                                clickLinkTo('/')
                            }}>
                                Home
                            </div>
                        </li>
                        <li>
                            <div className="menu-item" onClick = {() => {
                                clickLinkTo('/articles')
                            }}>
                                Articles
                            </div>
                        </li>
                        <li>
                            <div className="menu-item" onClick = {() => {
                                clickLinkTo('/about')
                            }}>
                                About Me
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}))