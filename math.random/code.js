self.cryptoGenerator = function(length){
    
    //IE11
    if (self.msCrypto) {
        self.crypto = self.msCrypto
    }
    
    
    //The larger length, the better the performance - but the longer initialization takes
    //For this reason, allow length to be set
    
    //We get a DOM Exception if we request over 65536 bytes of data
    //7 is the amount of bytes that we need for a 53 bit integer
    //65534 is the largest multiple of 7 under 65536
    const max = 65534
    
    length = Number(length) //Handle strings
    
    //Length is an optional parameter, and if excluded, is set to max
    //Check for NaN - we convert strings to numbers
    if (!length || isNaN(length)) {
        length = max
    } 
    
    //Avoid DOM Exception
    if (length > max) {
        length = max
    }
    
    //Make sure length is a multiple of 7
    length = length - length%7
    
    //Make sure we have at least 7 bytes of data
    if (length < 7) {
        length = 7
    }
    
    
    
    //Initialize array
    let _array = new Uint8Array(length) 
    
    //We won't set the array to random values yet - but we will set count to the length of the array so that
    //the first time the random number generator is called, the array will be filled with random values
    let _count = _array.length
    
    
    
    //Here's out random number generator
    let generator = function(){
        
        //Bitwise operations are going to be the fastest
        //However in JavaScript, they are 32 bits
        //Therefore, we must be careful to make sure we don't flip the sign bit
        //Multiplication and Exponentation are used where bitshifts can't
        
        
        if (_count > _array.length-1) {
            _array = crypto.getRandomValues(_array)
            _count = 0
        }
                
        let bottom32 = _array[_count] //Fill in bits 1-8        
        bottom32 += _array[_count+1] << 8 //Fill in bits 9-16
        bottom32 += _array[_count+2] << 16 //Fill in bits 17-24  
        
        
        //Shifting 8 bits by 24 may flip the sign bit, and make the number negative
        //Math.pow(2,24) === 2<<23 - THIS IS NOT A TYPO
        bottom32 += _array[_count+3] * (2<<23) //Fill in bits 25-32
        
            


        let top21 = _array[_count+4] //Fill in bits 1-8
        top21 += _array[_count+5] << 8 //Fill in bits 9-16
                
        //We now only need 5 bits
        //Shift 3 of the bits off - we are using 8 bit integers, and that will reduce it to 5 bits.
        //Then shift the 5 bits forward 16 into spots 17-21
        top21 += (_array[_count+6] >>> 3) << 16 //Fill in bits 17-21
        
        
        //Now we need to combine bottom32 and top21
        //Bitwise operations can't be in the following line - they would overflow
        let full53 = (top21*(Math.pow(2,32))) + bottom32 //We don't actually need to group them due to order of operations, but it makes it clearer
                
        _count += 7 //Increment Count
        
        //Math.random() returns a decimal between 0 and 1
        //Lets divide our value so that we match this behavior
        full53 /= Math.pow(2,53)
        
        return full53 //And return the value
    }
    
        
    return generator
}
