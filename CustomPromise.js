class CustomPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (val) => {
            if (this.state === "pending") {
                queueMicrotask(() => {
                    this.state = "fulfilled";
                    this.value = val;
                    this.onFulfilledCallbacks.forEach(cb => cb(val));
                });
            }
        };

        const reject = (err) => {
            if (this.state === "pending") {
                queueMicrotask(() => {
                    this.state = "rejected";
                    this.reason = err;
                    this.onRejectedCallbacks.forEach(cb => cb(err));
                });
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new CustomPromise((resolve, reject) => {
            if (typeof onFulfilled !== "function") {
                onFulfilled = (v) => v;
            }
            if (typeof onRejected !== "function") {
                onRejected = (err) => { throw err; };
            }

            const handleFulfilled = (val) => {
                try {
                    const result = onFulfilled(val);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            };

            const handleRejected = (err) => {
                try {
                    const result = onRejected(err);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            if (this.state === "fulfilled") {
                queueMicrotask(() => handleFulfilled(this.value));
            } else if (this.state === "rejected") {
                queueMicrotask(() => handleRejected(this.reason));
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        return this.then(
            (val) => {
                onFinally();
                return val;
            },
            (err) => {
                onFinally();
                throw err;
            }
        );
    }

    // ---------- Static Methods ----------
    static resolve(value) {
        if (value instanceof CustomPromise) {
            return value; // Already a CustomPromise
        }
        return new CustomPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new CustomPromise((_, reject) => reject(reason));
    }

    static all(promises) {
        return new CustomPromise((resolve, reject) => {
            let results = [];
            let completed = 0;

            promises.forEach((p, index) => {
                CustomPromise.resolve(p).then(value => {
                    results[index] = value;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                }).catch(reject);
            });
        });
    }

    static race(promises) {
        return new CustomPromise((resolve, reject) => {
            promises.forEach(p => {
                CustomPromise.resolve(p).then(resolve).catch(reject);
            });
        });
    }

    static allSettled(promises) {
        return new CustomPromise((resolve) => {
            let results = [];
            let completed = 0;

            promises.forEach((p, index) => {
                CustomPromise.resolve(p).then(value => {
                    results[index] = { status: "fulfilled", value };
                }).catch(reason => {
                    results[index] = { status: "rejected", reason };
                }).finally(() => {
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                });
            });
        });
    }
}

module.exports = CustomPromise;
