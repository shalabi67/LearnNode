// const PI = Math.PI;
// const E = Math.E;
// const SQRT2 = Math.SQRT2;

const { PI, E, SQRT2 }  = Math;
console.log(PI)

// With require
const { readFile } = require('fs');


const circle = {
  label: 'circleX',
  radius: 2,
};

const circle1 = {
    label: 'circleX',
    radius: 4,
};


const circleArea = ({ radius }) => (PI * radius * radius).toFixed(2);

console.log(circleArea(circle));
console.log(circleArea(circle1));
console.log(circleArea({radius:3}));

const circleAreaWithPrecision = ({ radius }, {presicion=2} = {}) => (PI * radius * radius).toFixed(presicion);
console.log(circleAreaWithPrecision(circle));
console.log(circleAreaWithPrecision(circle1, {presicion:5}));
/*
This will not work and wil give an error NaN
const radius = 10
console.log(circleArea(radius));
*/
