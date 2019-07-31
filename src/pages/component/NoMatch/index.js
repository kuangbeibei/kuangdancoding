import React, {
    useState
} from "react"

import {
    useInterval,
} from 'hooks'

import "./NoMatch.scss"

export default function ({history}) {

    const [count, setCount] = useState(5);
    useInterval(() => {
        if (count <= 1) {
            history.replace("/")
        } else {
            setCount(count -1);
        }
    }, 1000)
    

    return (
        <> 
            <div className="no-match-wrap">
                <p>{`你要找的页面不存在哦!`}</p>
                <p>{`倒计时`}  <span style={{color: 'rgba(34, 37, 207, 1)'}}>{`${count}s`}</span>  {`转至Blog主页...`}</p>
            </div>
        </>
    )
}
