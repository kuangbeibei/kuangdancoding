import React from 'react'

import "./Home.scss"

export default function (props) {
    return (
        <div className="home-wrap">
            <div className="avatar">
                <div className="img"></div>
            </div>
            <h3>Kuang Dan</h3>
            <h6>Coder</h6>
            <button>
                <a href="https://juejin.im/user/5ab45518f265da23914809c5/posts"><i className="fab fa-github"></i></a>
            </button>
            <button>
                <a href="https://www.instagram.com/danakuang/"><i className="fab fa-instagram"></i></a>
            </button>
            <button>
                <a href="https://twitter.com/kuang51821034"><i className="fab fa-twitter"></i></a>
            </button>
            <p className="intro">
                {`A person with the curiosity and interest to web-design became a web developer, and has decided to walk down the road to participate in co-constructing a more interesting and better Internet environment. `}
            </p>
        </div>
    )
}