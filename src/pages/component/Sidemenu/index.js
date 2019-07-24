import React from "react"
import {withRouter} from "react-router-dom"

import "./Side-menu.scss"

export default withRouter(function (props) {

    const {
        sideMenuActive,
        hideSideMenu,
        history
    } = props;

    const clickLinkTo = (path) => {
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
                                    <i className="fab fa-twitter"></i>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item">
                                <button>
                                    <i className="fab fa-instagram"></i>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item">
                                <button>
                                    <i className="fab fa-facebook"></i>
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
})