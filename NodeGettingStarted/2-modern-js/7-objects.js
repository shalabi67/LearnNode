const mystrey = 'answer'
const PI=Math.PI
const obj = {
  p1: 10,
  p2: 20,
  f1() {},
  f2: () => {},

  [mystrey] : 42,
  PI
};

console.log(obj.answer)
console.log(obj.PI)
