# le-promise

My custom implementation of the JavaScript class Promise.

## Reason for Creating this
* customizability
  * Would you like to tweak how Promises work? Say, what would you like this to return:
  `Promise.reject(new Error('Ooops!')).then()`
  A rejected promise (as Chrome does) or a pending promise (as Node.js does)?
* Consistency
  * You can take `le-promise` accross platforms and expect its behaviour not to change.
  While standard JavaScript promises may differ slightly in behavior accross platforms
  and also differ internally - algthough none of this should normally be a concern.
* Insight
  * The best way to understand a bicycle may be to re-invent it
* Polyfill
  * This code can be easily re-written to act as a polyfill for Promise-challenged browsers (see below)
* Fun
  * Writing this was a lot of fun ;)


## Installation
* git
  * 'git clone https://github.com/levanroinishvili/le-promise.git`
* npm
  * `npm install le-promise`
* Copy & paste into ES6 browsers
  * or just copy & paste the contents of the le-promise.js file into the browser console ;)
  * do not forget to remove the last statement `module.exports = lePromise;`
  * afterwards use in the console `lePromise` instead of `Promise`

## Usage
* node.js
``` JavaScript
const lePromise = require('./le-promise');
// Then simple use lePromise instead of Promise, eg:
const x = new lePromise( (resolve,reject)=>{  resolve(100); });
```
* Modular JavaScript
  * If you using a CommonJS modules in your script via a module loader or magic,
  you can use this class as shown in the example above for `node.js`
* ES6 JavaScript without support for modules (as currently is the case with browsers)
  * In the file `le-promise.js`, remove the last statement `module.exports = lePromise;
  * Include `le-promise.js` using the script tag, e.g. `<script src="le-promise.js"></script>`
  * Afterwards just use `lePromise` instead of `Promise`
* ES5 JavaScript
  * To be used with JavaScript ES5, the code will require slight rewrite, as ES5 does not support `class` statements.
  * Another option would be to use [babel](https://babeljs.io/repl/?presets=es2015) or similar
## Usage as a polifil

## Mixing `Promise` with `lePromise` in code
`lePromise` can be mixed with standard JavaScript promises, except inside
`lePromise.all()`, `lePromise.race()`, `Promise.all()` and `Promise.race()`

So, do not use any of the following:
```JavaScript
lePromise.all([ lePromise.resolve(1), Promise.resolve(2), lePromise.resolve(3) ]);
Promise.race([ Promise.resolve(1), Promise.reject(new Error('2')), lePromise.reject(new Error('3'))]);
```

The reason for this is that the internally Promise object is implemented differently on different platforms
and it may not have been worth the effort to figure out all the details, when `le-promise` was simply
conceived as an alternative implementation of the standard JavaScript Promise.
