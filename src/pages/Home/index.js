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
                {`A human with the curiosity to the Internet happens to be a web developer and decides to walk down the road to participate in co-constructing a more interesting and better Internet. `}
            </p>
        </div>
    )
}