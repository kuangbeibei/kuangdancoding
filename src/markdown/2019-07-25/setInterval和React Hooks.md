## Making setInterval Declarative with React Hooks
**2019-07-25**

---

From Overreacted 👉 **[Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)**

```js

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

```
  
####

<blockquote>

</blockquote>