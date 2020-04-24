import React, {useEffect} from "react";
import ReactMarkdown from "react-markdown";
import "style/markdown.scss"

const contentPath = require('./about.md');

let content = "";

export default function () {
    useEffect(() => {
        if (!content) {
            fetch(contentPath).then((response) => response.text()).then((text) => {
                content = text;
            })
        };
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