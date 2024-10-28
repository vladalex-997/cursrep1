// const x = 3;
// let y = 2;
// console.log(x, y);

const numberValue = 3;
const stringValue = "gigi";
const booleanValue = true;
const undefinedValue = undefined;
const nullValue = null;
const arrayValue = [1, 2, 3, 4, 5, "gigi", true, undefined, null];
const objectValue = {
  id: 1,
  name: "Gigi Hook",
  age: 30,
  workPlaces: ["Bucuresti", "Timisoara"],
  isEmployeed: true,
};

//chei prin care putem accesa valorile sunt in partea stanga a :

console.log(numberValue, stringValue);

console.log(arrayValue);

console.log(arrayValue[5]);

console.log("lungime arr:", arrayValue.length);

for (let i = 0; i < arrayValue.length; i++) {
  console.log(`Every array value of array[${i}]:`, arrayValue[i]);
  //folosire de placeholder in javascript ${javascript} pus cu `
}

// == -> compara valorile
// === -> compara valorile si tipul
// != -> compara valorile
// !== -> compara valorile si tipul

// scaderea intre un numar si string se realizeaza

const test = 3;
const test2 = "4";
const diff = test - test2;
console.log(diff);
console.log(typeof diff);

let age = -0.2;
if (age >= 18) {
  console.log("you are adult");
  alert("you are adult");
} else if (age > 0 && age <= 1) {
  console.log("you are baby");
  alert("you are baby");
} else if (age <= 0 || age >= 120) {
  console.log("invalid age");
  alert("invalid age");
} else if (typeof age !== "number") {
  console.log("invalid number");
  alert("invalid number");
} else if (isNaN(age)) {
  console.log("invalid number");
  alert("invalid number");
} else {
  console.log("you are minor");
  alert("you are minor");
}

//isNaN daca scriem "3" va converti in numar si va verifica daca e un numar

//ternatory operator

const isAdult = age >= 18 ? "you are adult" : "you are minor";
console.log(isAdult);

//forma if else
