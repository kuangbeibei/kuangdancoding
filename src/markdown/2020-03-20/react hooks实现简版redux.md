## react hooks实现简版redux🤒

**2020-03-20**

---

这个版本的使用与react-redux几乎一样，只是Provider不需要再把store传进来了，因为已经内置好了store。直接贴代码~

```js

import React, {useReducer} from 'react';

const ReduxContext = React.createContext();

// 关于延迟赋值的技巧！只有参数是函数时，返回的也是个待执行的函数的情况下，可以用这个技巧。
// 需要注意两点：1. 延迟取值，compose(middlewares)((...args) => store._dispatch(...args));
// 2. 不要覆盖useReducer原生的dispatch方法，即store._dispatch

export default function createStore(reducer, initialState) {
    let store = {};
    const Provider = props => {
        const [state, dispatch] = useReducer(reducer, initialState); // 一个知识点！在redux中，dispatch方法是可以被覆盖的。但是在用了useReducer返回的dispatch不能被覆盖！！
        store.getState = () => state;
        store._dispatch = dispatch;
        return <ReduxContext.Provider value={state}>
            {
                React.cloneElement(props.children)
            }
        </ReduxContext.Provider>
    }
    const connect = (mapStateToProps, mapDispatchToProps) => {
        return function (Component) {
            let actions = {};
            let state = initialState;
            return props => {
                if (store.getState) {
                    state = mapStateToProps(store.getState());
                }
                actions = mapDispatchToProps(store.dispatch);
                return <Component {...props} {...actions} {...state} dispatch={store.dispatch} />
            }
        }
    }
    return {
        store,
        Provider,
        connect
    }
}

function compose(...fns){
    if (fns.length === 0) return args => args;
    if (fns.length === 1) return fns[0];
    return fns.reduce((a,b) => (...args) => a(b(...args)))
}

export function applyMiddleware(...middlewares) {
    return function(createStore) {
        return function(reducer, initialState) {
            let {store, Provider, connect} = createStore(reducer, initialState);
            let dispatch;
            const middlewareApi = {
                getState: () => store.getState(),
                dispatch: (...args) => dispatch(...args) 
            };
            const chain = middlewares.map(middleware => middleware(middlewareApi));
            console.log('store._dispatch', store._dispatch);
            function fn(...args) {
                return store._dispatch(...args)
            }
            dispatch = compose(...chain)(fn); // 这里还需要延迟赋值，因为一开始是没有store._dispatch的
            // store._dispatch = dispatch; 不能覆盖原来的_dispatch方法，因为它是useReducer原生的。不然传入该给compose的原生dispatch方法就变了
            store.dispatch = dispatch; // 这里只能给一个新的，不能覆盖原来的store._dispatch, 因为上面传递给compose集联的原生dispatch方法store._dispatch用了延迟执行。
            return {
                store,
                Provider,
                connect
            }
        }
    }
}

```