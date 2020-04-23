## 手写promise😊

**2019-11-23**

---

时不时手写源码，巩固基础，培养码感，尽可能晚一点被后浪拍在沙滩上...🐶

```js

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

const resolveFpromise2X = (fpromise2, x, resolve, reject) => {
    if (fpromise2 === x) return reject('circuclar chaining');
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => resolveFpromise2X(fpromise2, y, resolve, reject), reject)
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

class Fpromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = void(0);
        this.reason = void(0);
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.status === PENDING) {
                if ((typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function') {
                    return value.then(resolve, reject);
                }
                this.status = RESOLVED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(cb => cb(value));
            }
        }
        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb(reason));
            }
        }

        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = onFulfilled ? onFulfilled : () => this.value;
        onRejected = onRejected ? onRejected : () => {throw Error(this.reason)};
        let fpromise2, x;
        fpromise2 = new Fpromise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        x = onFulfilled(this.value);
                        resolveFpromise2X(fpromise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        x = onRejected(this.reason);
                        resolveFpromise2X(fpromise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(value => {
                    setTimeout(() => {
                        try {
                            x = onFulfilled(value);
                            resolveFpromise2X(fpromise2, x, resolve, reject);
                        } catch(e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(reason => {
                    setTimeout(() => {
                        try {
                            x = onRejected(reason);
                            resolveFpromise2X(fpromise2, x, resolve, reject);
                        } catch(e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return fpromise2;
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    finally(fn) {
        return new Fpromise((resolve, reject) => {
            try {
                fn();
                return resolve(this.then());
            } catch(e) {
                reject(e)
            }
        })
    }
    static resolve(value) {
        return new Fpromise((resolve, reject) => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new Fpromise((resolve, reject) => {
            reject(reason)
        })
    }
    static all(promises) {
        if (promises.length === 0) {
            // 必须有参数
            return reject('TypeError: not iterable');
        } 
        if (!Array.isArray(promises)) {
            // 参数必须是数组
            return reject('TypeError: not iterable');
        }
        return new Fpromise((resolve, reject) => {
            const result = [];
            let len = 0;
            const processVal = (val, i) => {
                result[i] = val;
                if(++len === promises.length) {
                    resolve(result);
                }
            }
            promises.forEach((p, idx) => {
                if ((typeof p === 'object' || typeof p === 'function') && typeof p.then === 'function') {
                    p.then(r => processVal(r, i), reject)
                } else {
                    processVal(p, idx)
                }
            })
        })
    }
    static race(promises) {
        return new Fpromise((resolve, reject) => {
            if (promises.length === 0) {
                // 必须有参数
                return reject('TypeError: not iterable');
            } 
            if (!Array.isArray(promises)) {
                // 参数必须是数组
                return reject('TypeError: not iterable');
            }
            promises.forEach(p => {
                if ((typeof p === 'object' || typeof p === 'function') && typeof p.then === 'function') {
                    p.then(resolve, reject)
                } else {
                    resolve(p);
                }
            })
        })
    }
}

```