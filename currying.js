// Example 1
// ==========================================================================================================
// https://www.geeksforgeeks.org/debouncing-in-javascript/

function sum() {
    var add = function (a, b) { return a + b; },
        value = Array.prototype.reduce.call(arguments, add, 0);

    function f() { 
        value = Array.prototype.reduce.call(arguments, add, value);
        return f;
    }; 
    f.toString = function () { return value; };
    return f;
}

console.log(sum(5, 5));
console.log(sum(5)(5));
console.log(sum(3, 4, 5)(6, 7));

// Example 2
// ==========================================================================================================

function sum(n,m,o,p){ // uncurried standard function
  return n + m + o + p;
}
 
function curry(fn){ // takes an uncurried function and returns a curried function
  return function(...a){
           return a.length >= fn.length ? fn(...a)
                                        : curry(fn.bind(fn,...a));
         };
}

var csum = curry(sum); // now csum is the curried version of sum
console.log(csum(1,2,3,4));      // <- 10
console.log(csum(1)(2,3,4));     // <- 10
console.log(csum(1,2)(3,4));     // <- 10
console.log(csum(1,2,3)(4));     // <- 10
console.log(csum(1)(2)(3,4));    // <- 10
console.log(csum(1)(2)(3)(4));   // <- 10

// Example 3
// ==========================================================================================================

function callFun(fn){

                const doTo = (args) => args.reduce((acc, a) => fn.call(fn, acc, a))

                const next =(...args)=>{
                    return (...innerArg)=> {
                        if(innerArg.length){
                            return next(...args, doTo(innerArg))
                        }else{
                            return doTo(args)
                        }
                    }
                }

                return next()    
            }

            const sum = callFun((a,b) => a + b)

            console.log(sum(1)(2)(3,2,1)())

// Example 4
// ===============================================================================================================
const add1 = x => x+1;
const mul2 = x => x*2;
const div4 = x => x/4;

const pipe1 = (...args) => {
    var value = 0;
    return function f(initialValue) {
        value = initialValue;
        for(fn of args) {
            value = fn(value);
        }
        return value;
    }
}


console.log(pipe1(add1, mul2, div4)(3)) // = 2
console.log(pipe1(mul2, add1, div4)(3)) // = 1.75
console.log(pipe(mul2, div4, add1)(3)) // = 2.5
console.log(pipe(mul2, div4, add1, mul2)(3)) // = 5


// Example 5
// ==================================================================================================================
const add1 = x => x+1;
const mul2 = x => x*2;
const div4 = x => x/4;

const pipe1 = (...x) => {
    return(y)=>{
      return x.reduce((a,b) => b(a), y);
    }
   
}


console.log(pipe1(add1, mul2, div4, mul2, mul2, add1)(3)) // = 9
console.log(pipe1(mul2, add1, div4)(3)) // = 1.75
console.log(pipe1(mul2, div4, add1)(3)) // = 2.5
console.log(pipe1(mul2, div4, add1, mul2)(3)) // = 5

// Example 6
// ======================================================================================================================
const pipe3 = (...x) => {
    var sum = function (a,b) { return a+b; };
    var value = x.reduce( sum, 0);
    const f = (...y) => {
      value = y.reduce(sum, value);
      if(y.length) {return f;}
      else { return f.toString()}
    }

    f.toString = function() { return value; }

     return f;
}

console.log(pipe3(2)(3)(6)(7)()); //18
console.log(pipe3(2,3)(6)(7,8,9)()); // 35
console.log(pipe3(9)());
