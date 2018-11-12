## Cryptographically Secure Math.random()

### How to Use:

#### Step 1:
Place the following code before your JavaScript in your HTML file
```html
<script src="https://ecc521.github.io/polyfill/math.random/code.js"></script>
```

This will load the polyfill

#### Step 2:
Now you will have cryptoGenerator defined in your global scope.
To replace Math.random simply write the following line
```javascript
Math.random = self.cryptoGenerator(length)
```
  
Length is an optional parameter. 
If you are requesting large volumes of random numbers, don't bother setting it (or set it to 65534).
Otherwise, if you want to save a few milliseconds of initialization time, set length to the highest amount of calls you expect to make, multiplied by 7
