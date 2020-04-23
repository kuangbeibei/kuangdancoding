import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import "style/markdown.scss"

const contentPath = require('./about.md');

export default function () {
    const [content, getContent] = useState("");
    fetch(contentPath).then((response) => response.text()).then((text) => {
        getContent(text)
    })
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