const lePromise = require('../src/es6/le-promise');
let i=0;

// function nextPromise(val) {
//   let newVal = 10*val;
//   // setTimeout(()=>{
//     console.log(`Promise ${++i} received ${val} => ${newVal}`);
//     return new lePromise((res,rej)=>{rej(newVal);});
//   // },1);
//
// }
//
// new lePromise((res,rej)=>{
//   let newVal = 1;
//   rej(newVal);
//   console.log(`Promise 0 rejecting with ${newVal}`);
// })
// .then(console.log,nextPromise)
// .then(console.log,nextPromise)
// .then(console.log,nextPromise)
// .then(console.log,nextPromise)
// .then(console.log,nextPromise);

new lePromise( (res,rej)=>{
  //res(99);
  rej(101);
}).then(console.log,
  val => {
    console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
    return new lePromise( (res2,rej2)=>{
      rej2(10*val);
    });

  }
).then(console.log,
  val => {
    console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
    return new lePromise( (res2,rej2)=>{
      rej2(10*val);
    });

  }
).then(console.log,
  val => {
    console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
    return new lePromise( (res2,rej2)=>{
      rej2(10*val);
    });

  }
).then(console.log,
  val => {
    console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
    return new lePromise( (res2,rej2)=>{
      rej2(10*val);
    });

  }
).then(console.log,
  val => {
    console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
    return new lePromise( (res2,rej2)=>{
      rej2(10*val);
    });

  }
).then(console.log,
  val => {
    console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
    return new lePromise( (res2,rej2)=>{
      rej2(10*val);
    });

  }
)
;


// new lePromise( (res,rej)=>{
//   //res(99);
//   setTimeout(()=>{rej(101);},2000);
// }).then(console.log,
//   val => {
//     console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
//     return new lePromise( (res2,rej2)=>{
//       setTimeout(()=>{rej2(10*val);},2000);
//     });
//
//   }
// ).then(console.log,
//   val => {
//     console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
//     return new lePromise( (res3,rej3)=>{
//       setTimeout(()=>{rej3(10*val);},2000);
//     });
//
//   }
// ).then(
//   val => {console.log,
//     console.log(`Promise ${i++} rejected with ${val}, sending ${10*val} on to Promise ${i}`);
//     return new lePromise( (res2,rej2)=>{
//       setTimeout(()=>{rej2(10*val);},2000);
//     });
//
//   }
// )
// ;


// new lePromise( (res,rej)=>{
//   //res(99);
//   setTimeout(()=>{res(101);},2000);
// }).then(
//   val => {
//     console.log(`Promise ${i++} resolved with ${val}, sending ${10*val} on to Promise ${i}`);
//     //return -3;
//     return new lePromise( (res2,rej2)=>{
//       setTimeout(()=>{res2(10*val);},2000);
//     });
//
//   }, err=>{
//
//   }
// ).then(
//   val => {
//     console.log(`Promise ${i++} resolved with ${val}, sending ${10*val} on to Promise ${i}`);
//     return new lePromise( (res2,rej2)=>{
//       setTimeout(()=>{res2(10*val);},2000);
//     });
//
//   }, err=>{
//
//   }
// ).then(
//   val => {
//     console.log(`Promise ${i++} resolved with ${val}, sending ${10*val} on to Promise ${i}`);
//     return new lePromise( (res2,rej2)=>{
//       setTimeout(()=>{res2(10*val);},2000);
//     });
//
//   }, err=>{
//
//   }
// )
// ;
