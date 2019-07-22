import React from 'react'

import "./Blog.scss"

export default class extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            markdown: ""
        }
    }

    componentWillMount () {
        // fetch(mdFile).then(res =>{
        //     return res.text()
        // }).then(text => {
        //     this.setState({
        //         markdown: text
        //     })
        // });
    }

    render () {
        return (
            <div></div>
        )
    }
       
}