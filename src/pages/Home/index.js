import React, {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import "style/markdown.scss"

import "./Home.scss";
const contentPath = require('./home.md');

export default function (props) {
    const [content, getContent] = useState("");

    useEffect(() => {
        fetch(contentPath).then((response) => response.text()).then((text) => {
            getContent(text)
        })
    }, [])    

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
            <div className="intro">
                <ReactMarkdown
                    source={content}
                    escapeHtml={false}
                />
            </div>
        </div>
    )
}