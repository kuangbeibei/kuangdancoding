import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Header />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Articles} />
            </div>
        </Router>
    )
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Article(obj) {
    const {
        match
    } = obj;

    console.log('match', match);
    return <h3>Requested Param: {match.params.name}</h3>;
}

function Articles(obj) {
    console.log('obj', obj);
    const {
        match
    } = obj;
    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Route path={`${match.path}/:name`} component={Article} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

function Header() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
             <li>
                <Link to="/about">About</Link>
            </li>
             <li>
                <Link to="/topics">Topics</Link>
            </li>
        </ul>
    );
}

export default App;
