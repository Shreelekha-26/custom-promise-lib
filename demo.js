const CustomPromise = require("./CustomPromise");

console.log("=== Promise.all ===");
CustomPromise.all([
    CustomPromise.resolve(1),
    CustomPromise.resolve(2),
    CustomPromise.resolve(3)
]).then(values => {
    console.log("All resolved:", values);
});

console.log("=== Promise.race ===");
CustomPromise.race([
    new CustomPromise((res) => setTimeout(() => res("First"), 500)),
    new CustomPromise((res) => setTimeout(() => res("Second"), 1000))
]).then(value => {
    console.log("Race winner:", value);
});

console.log("=== Promise.allSettled ===");
CustomPromise.allSettled([
    CustomPromise.resolve("OK"),
    CustomPromise.reject("Error")
]).then(results => {
    console.log("All settled:", results);
});
