const myPromiseAny = (promises) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("promises should be array"));
        }
        promises.forEach((promise) => {
            Promise.resolve(promise)
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => {});
        });
    });
};
myPromiseAny([
    new Promise((resolve) => setTimeout(() => resolve("vinay"), 3000)),
    new Promise((resolve) => setTimeout(() => resolve("vinay11"), 2000)),
])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
