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
/*
This will not work and wil give an error NaN
const radius = 10
console.log(circleArea(radius));
*/

//using default values
const circleAreaWithPrecision = ({ radius }, {presicion=2} = {}) => (PI * radius * radius).toFixed(presicion);
console.log(circleAreaWithPrecision(circle));
console.log(circleAreaWithPrecision(circle1, {presicion:5}));

