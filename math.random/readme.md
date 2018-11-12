# Cryptographically Secure Math.random()

## How to Use:

### Step 1: Load the Polyfill
```html
<script src="https://ecc521.github.io/polyfill/math.random/code.js"></script>
```


**If you perfer not to block the main thread, run this in an async function**
```javascript
let polyfill = await fetch("https://ecc521.github.io/polyfill/math.random/code.js")
polyfill = await polyfill.text()
eval(polyfill) //Yes, I did just use eval. It runs in the global scope just like the other 2 examples
```


**Using Web Workers**
```javascript
self.importScripts('https://ecc521.github.io/polyfill/math.random/code.js');
```

If you also need the code on the main page, don't want to make 2 requests, and don't trust disk cache, you will need to:
1. Send String(cryptoGenerator) to the Worker
2. Call eval(string_of_code) in the Worker


### Step 2:
Now you will have `cryptoGenerator` defined in your global scope.
To replace `Math.random` simply write the following line
```javascript
Math.random = self.cryptoGenerator(length)
```


`length` is an optional parameter. 
If you are requesting large volumes of random numbers, don't bother setting `length` (or set it to 65534).

Otherwise, if you want to save a few milliseconds of initialization time, set `length` to the highest amount of calls you expect to make, multiplied by 7






### _So why don't you automatically overwrite `Math.random`?_

1. Allow variable(s) other that Math.random
2. Allow use **In Web Workers**


**If you want to keep `Math.random`, try the following:**
```javascript
_whatever_you_want = self.cryptoGenerator(length)
```



### Performance:
~1,350 calls per *millisecond*, or 1,350,000 calls per second

*Measured on a Samsung Chromebook Plus with `length` set at it's default value*


### Browser Support
[View the Stats on Can I Use](https://caniuse.com/#feat=getrandomvalues)

I do handle the ms prefix, and therefore support IE11
