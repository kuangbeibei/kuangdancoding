import React, {
    useState
} from "react"
import ReactMarkdown from "react-markdown"

import {useInterval} from 'hooks'

import "./Article.scss"

const record = {};

export default function ({match, history}) {

    const {
        date,
        title
    } = match.params;

    const [content, getContent] = useState("");

    const [count, setCount] = useState(3);

    console.log('history ,', history);

    try {
        const contentPath = require(`markdwon/${date}/${title}.md`) // 这样拿到的是路径，不行

        if (!record[title]) {
            console.log('第一次')
            fetch(contentPath).then((response) => response.text()).then((text) => { // 要这样去拿内容
                record[title] = text;
                getContent(text)
                console.log('第一次拿到')
            })
        } else {
            console.log('已经拿过')
        }

        // 问题，控制台偶尔会出现 ....To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        // https://github.com/facebook/react/issues/14227

        return (
            <div className="article-wrap">
                <section className="article-section">
                    <ReactMarkdown source = {content || record[title]} />
                </section>
            </div>
        );

    } catch (e) {

        return (
            <div className="article-wrap">
                <section className="article-section">
                    <p>Attention: 这篇文章不存在!</p>
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