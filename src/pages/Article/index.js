import React, {
    useState
} from "react"
import ReactMarkdown from "react-markdown"

import {useInterval} from 'hooks'

import "style/markdown.scss"
import "./Article.scss"

const record = {};

export default function ({match, history}) {
    const {
        date,
        title
    } = match.params;

    const [content, getContent] = useState("");

    const [count, setCount] = useState(5);

    try {
        const contentPath = require(`markdwon/${date}/${decodeURIComponent(title)}.md`) // 这样拿到的是路径，不行

        if (!record[title]) {
            fetch(contentPath).then((response) => response.text()).then((text) => { // 要这样去拿内容
                record[title] = text;
                getContent(text);
            })
        } else {
            // console.log('已经拿过')
        }

        // 问题，控制台偶尔会出现 ....To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        // https://github.com/facebook/react/issues/14227

        return (
            <div className="article-wrap">
                <section className="article-section">
                    <ReactMarkdown 
                        source = {content || record[title]} 
                        escapeHtml={false}
                    />
                </section>
            </div>
        );

    } catch (e) {

        return (
            <div className="article-wrap">
                <section className="article-section">
                    <p>{`Attention: 这篇文章不存在哦!`}</p>
                    <p>{`倒计时`}  <span style={{color: 'rgba(34, 37, 207, 1)'}}>{`${count}s`}</span>  {`转至Blog主页...`}</p>
                    {
                        useInterval(() => {
                            if (count <= 1) {
                                history.replace("/")
                            } else {
                                setCount(count - 1);
                            }
                        }, 1000)
                    }
                </section>
            </div>
        )
    }
}