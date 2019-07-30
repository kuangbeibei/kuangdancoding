import React, {
    useState,
    useEffect
} from "react"

import {useInterval} from 'hooks'

import "./NoMatch.scss"

export default function ({history}) {

    // const [count, setCount] = useState(5);

    // useInterval(() => {
    //     console.log(count);
    //     if (count <= 1) {
    //         history.replace("/")
    //     } else {
    //         setCount(count - 1);
    //     }
    // }, 1000);

    const count = useInterval();

    if (count < 1) {
        history.replace("/")
    }

    // useEffect(() => {
    //     let timer = setInterval(() => {
    //         setCount(count - 1);
    //         console.log('count ,', count);
    //         if (count < 1) {
    //             history.replace("/")
    //         }
    //     }, 1000);

    //     return () => {
    //         clearInterval(timer);
    //         timer = null
    //     }
    // })

    // setInterval(() => {
    //     setCount(count - 1);
    //     console.log('count', count)
    //     if (count <= 0) {
    //         history.replace("/")
    //     }
    // }, 100)

    return (
        <> 
            <div className="no-match-wrap">
                <p>{`你要找的页面不存在哦!`}</p>
                <p>{`倒计时`}  <span style={{color: 'rgba(34, 37, 207, 1)'}}>{`${count}s`}</span>  {`转至Blog主页...`}</p>
            </div>
        </>
    )
}
