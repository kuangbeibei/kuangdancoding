import React from "react"
import "./Side-menu.scss"

export default function (props) {

    const {
        sideMenuActive,
        hideSideMenu
    } = props;

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
                    </ul>
                </div>
            </div>
        </>
    )
}