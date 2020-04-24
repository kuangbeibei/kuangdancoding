import React, {memo} from "react";
import {Link, Route, Switch} from "react-router-dom"

import ArticleList from "data/data.json"

import Article from "pages/Article"

import "./Articles.scss"

export default memo(function ({match, history}) {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path = {match.path}
                    render = {() => (
                        <div className="articles-wrap">
                            <h2>Articles</h2>
                            <ul>
                                {
                                    ArticleList.map((article, idx) => {
                                        const d = (Object.keys(article))[0];
                                        const title = article[d].title.slice(0, -3);
                                        return <li key = {idx}><Link to={`${match.path}/${d}/${encodeURIComponent(title)}`}>{title}</Link></li>
                                    })
                                }
                            </ul>
                        </div>
                    )}
                />

                <Route 
                    path = {`${match.path}/:date/:title`}
                    component={Article}
                    history = {history}
                />
            </Switch>
        </>
    );
})
