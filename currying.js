// Example 1
// ==========================================================================================================

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
