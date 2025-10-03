const myPromiseRace = (promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise)
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => reject(err));
        });
    });
};

myPromiseRace([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("vinay");
        }, 2000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("lll");
        }, 3000);
    }),
]).then((res)=>{console.log(res)})
