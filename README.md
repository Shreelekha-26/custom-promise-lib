

# custom-promise-lib

A lightweight JavaScript library that recreates the native `Promise` API from scratch, including `.then()`, `.catch()`, `.finally()`, and static methods like `Promise.all()`, `Promise.race()`, and `Promise.allSettled()`.  
Built for learning, it explores **microtasks**, **closures**, **state management**, **chaining**, and **asynchronous flow** through a hands‑on implementation.

---

## 📜 Description
`custom-promise-lib` is an educational project that mimics the behavior of JavaScript promises.  
It helps developers understand how promises work internally by manually implementing:

- **Promise States** – `pending`, `fulfilled`, `rejected`
- **Chaining** – `.then()` returning new promises
- **Error Handling** – `.catch()`
- **Cleanup Actions** – `.finally()`
- **Static Methods** – `Promise.all()`, `Promise.race()`, `Promise.allSettled()`

---

## 🚀 Installation
Clone the repository:
```bash
git clone https://github.com/Shreelekha-26/custom-promise-lib.git
cd custom-promise-lib
