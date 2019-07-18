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
                <i className="fab fa-twitter"></i>
            </button>
            <button>
                <i className="fab fa-instagram"></i>
            </button>
            <button>
                <i className="fab fa-facebook"></i>
            </button>
            <p className="intro">
                {`A person with the curiosity to the Internet happens to be a web developer and decide to go through the road to help co-construct a more interesting and better Internet. `}
            </p>
        </div>
    )
}