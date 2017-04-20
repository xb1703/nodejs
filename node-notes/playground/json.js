var o = {
  name: 'Paolo',
  age: 24
};
console.log(o);
console.log(typeof o);

var objectStringified = JSON.stringify(o);

// breakpoint
debugger;

console.log(objectStringified);
console.log(typeof objectStringified);

var str = JSON.parse(objectStringified);

// breakpoint
debugger;

console.log(str);
console.log(typeof str);
