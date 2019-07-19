import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from "component/Header"
import Main from "component/Main"
import Sidemenu from "component/Sidemenu"
import About from "pages/About"
import Blog from "pages/Blog"
import Home from "pages/Home"


import "style/font.css"
import "style/reset.css"
import "style/global.scss"


let resizeTimer;
let scrollTimer;

class App extends React.Component {

    state = {
        windowWidth: window.innerWidth,
        scrollTop: 0,
        sideMenuVisible: false,
        sideMenuActive: false
    }

    componentDidMount () {
        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener('scroll', this.onWindowScroll)
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener('scroll', this.onWindowScroll)
    }

    onWindowResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            this.setState({
                windowWidth: window.innerWidth
            })
        }, 100)
    }

    onWindowScroll = () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            this.setState({
                scrollTop: window.scrollY
            })
        }, 10)
    }

    showSideMenu = () => {
        this.setState({
            sideMenuVisible: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    sideMenuActive: true
                })
                document.body.className = "overflow-hidden"
            }, 100)
        })
    }

    hideSideMenu = () => {
        this.setState({
            sideMenuActive: false,
        }, () => {
            setTimeout(() => {
                this.setState({
                    sideMenuVisible: false
                })
                document.body.className = ""
            }, 100)
        })
    }

    toggleSideMenu = () => {
        const {
            sideMenuVisible,
            sideMenuActive
        } = this.state;

        if (sideMenuVisible) {
            return (
                <Sidemenu 
                    sideMenuActive = {sideMenuActive} 
                    hideSideMenu = {this.hideSideMenu.bind(this)}
                />
            ) 
        } else {
            return null
        }
    }

    render () {
        const {
            sideMenuActive,
            scrollTop
        } = this.state;

        return (
            <>
                <Router>
                    <div className={`wrap-container ${sideMenuActive ? "side-move-show-menu" : ""}`}>
                        <Header 
                            {...this.state} 
                            showSideMenu = {this.showSideMenu.bind(this)}
                        />
                        {/* <div style = {{height: '200px'}}></div> */}

                        <Route path="/articles" component={Articles} />

                        <Switch>

                            <Route exact path="/" component={() => {
                                return (
                                    <Main 
                                        Component = {Home} 
                                        scrollTop = {scrollTop}
                                    />
                                )
                            }}/>

                            <Route path="/about" component={() => {
                                return (
                                    <Main 
                                        Component = {About} 
                                        scrollTop = {scrollTop}
                                    />
                                )
                            }}/>

                            <Route path="/blog" component={() => {
                                return (
                                    <Main 
                                        Component = {Blog} 
                                        scrollTop = {scrollTop}
                                    />
                                )
                            }}/>
            
                        </Switch>
                    </div>
                </Router>
                {
                    this.toggleSideMenu()
                }
            </>
        )
    }
}

function Article({match}) {
    return <h3>Requested Param: {match.params.name}</h3>;
}

function Articles({match}) {
    return (
        <div>
            <h2>Articles</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Route path={`${match.path}/:name`} component={Article} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

export default App