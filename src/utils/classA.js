@annotation
class ClassA { }

function annotation(target) {
  target.annotated = true;
}

/* eslint-disable */
// function enumerable(value) {
//   return function (target, key, descriptor) {
//     descriptor.enumerable = value;
//     return descriptor;
//   }
// }

// class ClassA {
//   @enumerable(false)
//   method() { }
// }
/* eslint-enable */

// function dec(id){
//   console.log('evaluated', id);
//   return (target, property, descriptor) => console.log('executed', id);
// }


/* function dec(target, property, descriptor){
  // eslint-disable-next-line
  console.log("executed");
} */

/* class Example {
  // @(dec(1))
  // @(dec(2))

  @dec
  method(){
    // eslint-disable-next-line
    console.log();
  }
}

const e = new Example();
e.method(); */

export default ClassA;
