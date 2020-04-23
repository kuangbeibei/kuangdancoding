import React, {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import "style/markdown.scss"

const contentPath = require('./about.md');

export default function () {
    const [content, getContent] = useState("");

    useEffect(() => {
        fetch(contentPath).then((response) => response.text()).then((text) => {
            getContent(text)
        })
    }, []);

    return (
        <div className="blog-wrap">
            <section className="blog-section">
                <ReactMarkdown
                    source={content}
                    escapeHtml={false}
                />
            </section>
        </div>
    )
}