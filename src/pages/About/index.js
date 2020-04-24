import React, {useState, useEffect, memo} from "react";
import ReactMarkdown from "react-markdown";
import "style/markdown.scss";

const contentPath = require('./about.md');

let aboutContent = "";

export default function () {
    const [content, getContent] = useState("");
    useEffect(() => {
        if (!aboutContent) {
            fetch(contentPath).then((response) => response.text()).then((text) => {
                getContent(text);
                aboutContent = text;
            })
        }
    }, []);

    return (
        <div className="blog-wrap">
            <section className="blog-section">
                <ReactMarkdown
                    source={content || aboutContent}
                    escapeHtml={false}
                />
            </section>
        </div>
    )
}