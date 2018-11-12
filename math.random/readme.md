## Cryptographically Secure Math.random()

### How to Use:

#### Step 1:
Place the following code before your JavaScript in your HTML file. This will load the polyfill.
```html
<script src="https://ecc521.github.io/polyfill/math.random/code.js"></script>
```


#### Step 2:
Now you will have `cryptoGenerator` defined in your global scope.
To replace `Math.random` simply write the following line
```javascript
Math.random = self.cryptoGenerator(length)
```
  
`length` is an optional parameter. 
If you are requesting large volumes of random numbers, don't bother setting `length` (or set it to 65534).

Otherwise, if you want to save a few milliseconds of initialization time, set `length` to the highest amount of calls you expect to make, multiplied by 7




### Performance:
~1,350 calls per *millisecond*, or 1,350,000 calls per second
*Measured on a Samsung Chromebook Plus with `length` set at it's default value*


### Browser Support
[View the Stats on Can I Use](https://caniuse.com/#feat=getrandomvalues)

I do handle the ms prefix, and therefore support IE11
