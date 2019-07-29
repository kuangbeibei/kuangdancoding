import {
    useState,
    useEffect,
    useRef
} from "react"
/**
 * 这里面存放自定义hook
 */

function useInterval(callback, delay) {
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
  
      	return () => {
          	window.removeEventListener("resize", handleResize);
      	};
  	})

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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
	})
	
	return (y/6).toFixed(2)
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

		return () => {
			window.removeEventListener('load', handleLoading);
		}
	})

	return loading
}

export {
	useInterval,
	useWindowWidth,
	useWindowScroll,
	useWindowOnload
}
