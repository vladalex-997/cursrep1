import { checkBusinessHours } from "./util.js";
// avem un business
// orele de operare ale businessului sunt 9-17
// scrie un script care sa intrebe utilizatorul la ce ora vrea sa viziteze
// magazinul.
// Daca valoare pusa este intre orele deschise -> spune "Everything is fine!"
// Daca valoarea pusa este in afara orele deschise -> "Sorry, we're closed, please
// come back in X hours"
// x -> reprezinta numarul de ore in care utilizatorul poate veni la magazin

// const x = checkBusinessHours(9, 17);
// console.log(x);

const myArray = [1, 2, 3, 4];

const myArray2 = myArray.map((element) => element * element);

let patrat = 0;
myArray.forEach((element) => {
  patrat += element * element;
});

console.log(myArray2, patrat);

const doubledArray = [];

myArray.forEach((element) => {
  doubledArray.push(element * 2);
});

console.log(doubledArray);

const myArray4 = ["a", "b", "c"];

myArray4.sort((a, b) => a > b);
console.log(myArray4);
const sortedArray = myArray4.slice().sort((a, b) => {
  console.log("a:", a, " b:", b);
  console.log(a.localeCompare(b));
  return b.localeCompare(a);
});
console.log(">>", myArray4);
console.log(sortedArray);
