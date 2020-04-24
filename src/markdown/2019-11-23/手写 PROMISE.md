## 手写promise😊

**2019-11-23**

---

时不时手写源码，巩固基础，培养码感，尽可能晚一点被后浪拍在沙滩上...🐶

```js

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function resolveKpromise2x(kpromise2, x, resolve, reject) {
    if (kpromise2 === x) return reject('circular chaining');
    if ( x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => resolveKpromise2x(kpromise2, y, resolve, reject), reject)
            } else {
                resolve(x);
            }
        } catch(e) {
            reject(e)
        }
    } else {
        resolve(x);
    }
}

class Kpromise {
    constructor(executor) {
        this.value = void(0);
        this.reason = void(0);
        this.status = PENDING;
        this.fullfilledFns = [];
        this.unfullfilledFns = [];

        const resolve = value => {
            if (this.status === PENDING) {
                if (value.then && typeof value.then === 'function') {
                    return value.then(resolve, reject);
                }
                this.status = RESOLVED;
                this.value = value;
                this.fullfilledFns.forEach(fn => fn(value))
            }
        };

        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.unfullfilledFns.forEach(fn => fn(reason));
            }
        }

        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        let kpromise2, x;
        kpromise2 = new Kpromise((resolve, reject) => {
            onFulfilled = onFulfilled ? onFulfilled : _ => this.value;
            onRejected = onRejected ? onRejected : _ => reject(this.reason);

            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        x = onFulfilled(this.value);
                        resolveKpromise2x(kpromise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        x = onRejected(this.reason);
                        resolveKpromise2x(kpromise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === PENDING) {
                this.fullfilledFns.push(value => {
                    setTimeout(() => {
                        try {
                            x = onFulfilled(value);
                            resolveKpromise2x(kpromise2, x, resolve, reject);
                        } catch(e) {
                            reject(e)
                        }
                    }, 0);
                });

                this.unfullfilledFns.push(reason => {
                    try {
                        x = onRejected(reason);
                        resolveKpromise2x(kpromise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                })
            }
        })
        return kpromise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        return new Kpromise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new Kpromise((resolve, reject) => {
            reject(reason);
        })
    }

    static all(promises) { // 异步并发，遍历 + 计数器
        if (!Array.isArray(promises) || promises.length === 0) return Kpromise.reject(TypeError('not iterable'));
        return new Kpromise((resolve, reject) => {
            let len = promises.length;
            let count = 0;
            let result = [];
            const processData = (val, idx) => {
                result[idx] = val;
                if (++count === len) {
                    resolve(result);
                }
            };
            promises.forEach((p, idx) => {
                if (p.then && typeof p.then === 'function') {
                    p.then(val => processData(val, idx), reject)
                } else {
                    processData(p, idx);
                }
            })
        })
    }

    static race(promises) {
        if (!Array.isArray(promises) || promises.length === 0) return Kpromise.reject(TypeError('not iterable'));
        return new Kpromise((resolve, reject) => {
            promises.forEach(p => {
                if (p.then && typeof p.then === 'function') {
                    p.then(resolve, reject)
                } else {
                    resolve(p)
                } 
            })
        })
    }

    finally(fn) {
        try {
            fn();
            return this.then();
        } catch(e) {
            Kpromise.reject(e);
        }
    }
}

```