import {
    useState,
    useEffect,
	useRef,
} from "react"
/**
 * 这里面存放自定义hook
 */

function useInterval(callback, delay) { //Dan Abramov 的版本
	const savedCallback = useRef();
  
	// Remember the latest callback.
	useEffect(() => {
	  savedCallback.current = callback;
	}, [callback]);
  
	// Set up the interval.
	useEffect(() => {
	  function tick() {
		savedCallback.current();
	  }
	  if (delay !== null) {
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	  }
	}, [delay]);
}

// function useInterval (initialCount) { // 我这个版本的问题在于，由于我的逻辑写在外面，只要有 history的操作，即便跳转了，还是会执行完这个代码，会报一个warning：Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.

// 	const [count, setCount] = useState(initialCount);
// 	// console.log('开始');

// 	useEffect(() => {
// 		// console.log('进入useEffect');
// 		const timerId = setInterval(() => {
// 			// console.log('count', count); //为什么这个始终是5，因为useEffect的第二个参数是个空数组，意味着useEffect只执行一次。
// 			setCount(count => {
// 				// console.log('我是 setCount 里面的count ,', count); //这里面的会变化，每一秒钟变化的只是这个函数
// 				return count - 1
// 			});
// 		}, 1000)

// 		return () => clearInterval(timerId);
// 	}, [])

// 	return count;
// }

// function useSetInterval(callback, delay) { // 这个问题在于不efficient，因为callback每次都会变化
// 	useEffect(() => {
// 		const timerId = setInterval(() => {
// 			callback()
// 		}, delay)
// 		return () => clearInterval(timerId);
// 	}, [callback, delay])
// }

function useWindowWidth () {
  	const [
      	windowWidth,
      	setWindowWidth
	] = useState(window.innerWidth);

  	useEffect(() => {
      	const handleResize = () => {
          	requestAnimationFrame(() => {
              	setWindowWidth(window.innerWidth);
          	})
		}
		  
      	window.addEventListener("resize", handleResize);
  
      	return () => window.removeEventListener("resize", handleResize);
  	}, [])

  	return windowWidth
}

function useWindowScroll () {
    const [y, setY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setY(window.scrollY)
            })
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
	}, [])
	
	return (y/4).toFixed(2)
}

function useWindowOnload () {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const handleLoading = () => {
			requestAnimationFrame(() => {
                setLoading(false)
            })
		}

		window.addEventListener('load', handleLoading);

		return () => window.removeEventListener('load', handleLoading);
	}, [])

	return loading
}

export {
	useInterval,
	useWindowWidth,
	useWindowScroll,
	useWindowOnload,
}
