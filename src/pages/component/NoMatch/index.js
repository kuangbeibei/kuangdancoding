import React, {
    useState,
    useEffect
} from "react"

import {useInterval} from 'hooks'

import "./NoMatch.scss"

export default function ({history}) {

    const [count, setCount] = useState(5);

    // useInterval(() => {
    //     console.log('count ---> 0,', count);
    //     if (count < 1) {
    //         history.replace("/")
    //     } else {
    //         setCount(count => {
    //             console.log('count ----> 2,', count);
    //             const res = count -1;
    //             console.log('res ====>>> ,', res); // res是新的快照，它会反映到render的ui（outer）界面上。其他都是当时的（旧的）快照。
    //             // Each Render Has Its Own Effects
    //             // Each Render Has Its Own… Everything
    //             return res
    //         });
    //         console.log('count ---> 1,', count);
    //     }
    // }, 1000);

    // console.log('outer count------> ,', count)

    useInterval(() => {
        if (count === 1) {
            history.replace("/")
        } else {
            setCount(count -1)
        }
    }, 1000)

    // const count = useInterval(5);

    // console.log('count ---> 1,', count);
    // let count = 5;

    // setInterval(() => {
    //     count--;
    //     console.log('count 1,', count); //这样是没用的，只有内部state变化，或者props改变，组件才会re-render
    // }, 1000)    

    // console.log('count 2,', count);

    // if (count < 1) {
    //     history.replace("/")
    // }

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
