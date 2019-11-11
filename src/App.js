import React, {
    useState,
} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Loading from "component/Loading"
import Background from "component/Background"
import Header from "component/Header"
import Main from "component/Main"
import Sidemenu from "component/Sidemenu"
import Footer from "component/Footer"
import NoMatch from "component/NoMatch" 

import About from "pages/About"
import Blog from "pages/Blog"
import Home from "pages/Home"
import Articles from "pages/Articles"

import {
    useWindowOnload
} from "hooks"

import "style/font.css"
import "style/reset.css"
import "style/global.scss"


export default function App() {
    const loadingVisible = useWindowOnload();

    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const [sideMenuActive, setSideMenuActive] = useState(false)

    
    const showSideMenu = async () => {
        await setSideMenuVisible(true);
        await setTimeout(() => {
            setSideMenuActive(true)
        }, 100)
    }

    const hideSideMenu = async () => {
        await setSideMenuActive(false);
        await setTimeout(() => {
            setSideMenuVisible(false);
        }, 100)
    }

    const toggleSideMenu = () => {
        if (sideMenuVisible) {
            return (
                <Sidemenu 
                    sideMenuActive = {sideMenuActive} 
                    hideSideMenu = {hideSideMenu}
                />
            ) 
        } else return null
    }

    const toggleLoading = () => {
        if (loadingVisible) {
            return (
                <Loading 
                    loadingActive = {true}
                />
            )
        } else return null
    }

    return (
        <>
            <Router>

                <Header
                    showSideMenu = {showSideMenu}
                    sideMenuActive = {sideMenuActive}
                />

                {/* 滚动下移的背景图 */}
                <Background />
                
                {/* 主体 */}
                <div className={`wrap-container ${sideMenuActive ? "side-move-show-menu" : ""}`}>

                    <Switch>

                        <Route exact path="/" component={() => {
                            return (
                                <Main
                                    Component = {Home}
                                />
                            )
                        }}/>

                        <Route path="/about" component={() => {
                            return (
                                <Main
                                    Component = {About}
                                />
                            )
                        }}/>

                        <Route path="/blog" component={() => {
                            return (
                                <Main
                                    Component = {Blog}
                                />
                            )
                        }}/>

                        <Route path="/articles" component={({match, history}) => {
                            return (
                                <Main 
                                    Component = {Articles}
                                    match = {match}
                                    history = {history}
                                />
                            )
                        }} />

                        <Route component={({history}) => {
                            return (
                                <Main 
                                    Component = {NoMatch}
                                    history = {history}
                                />
                            )
                        }} />
                        
                    </Switch>
                </div>

                <Footer />

                {/* 侧边栏 */}
                {
                    toggleSideMenu()
                }

            </Router>

            {/* loading */}
            {
                toggleLoading()
            }
            
        </>
    )
}