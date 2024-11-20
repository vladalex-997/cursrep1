import { readFromLS, removeFromLS, writeToLS } from "./util.js";

// const x = 3;
// console.log(x);

// const button = document.querySelector("#btn");
// const paragraph = document.querySelector(".paragraph");

// button.addEventListener("click", () => {
//   writeToLS("gigi", x);
// });

// paragraph.innerText = readFromLS("gigi");

// console.log(removeFromLS("gigi"));
import { readFromLS, writeToLS } from "./util.js";

const registerBtn = document.querySelector("#registerBtn");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const password = document.querySelector("#password");
const age = document.querySelector("#age");
const error = document.querySelector("#error");
const usersToShow = document.querySelector(".users");

const users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || false;

if (loggedUsers) {
  window.location.assign("./home.html");
}

users.forEach((user) => {
  const el = document.createElement("p");
  el.innerText = user.userNameInput;
  usersToShow.appendChild(el);
});

//Vrem sa stocam in local storage un array cu userii care se inregistraza
// + un obiect care retine utilizatorul curent logat
// TREBUIE SA VALIDAM LUCRURI

//username minim 4 caractere
//validare email
//fisrtname, lastname minim 2 caractere
//password minim 6 caractere, minim o litera mare, minim o litera mica, minim 1 cifra, minim un caracter special
//username si email sunt unice! Nu pot avea 2 utilizatori cu acelasi username si email
//   const upperCaseRegex = /[A-Z]/;
//  const lowerCaseRegex = /[a-z]/;
//  const numberRegex = /[0-9]/;
//  const specialCharRegex = /[!@#]/;
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

const isValidPassword = (password) => {
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*]/;
  return (
    password.length >= 6 &&
    upperCaseRegex.test(password) &&
    lowerCaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  );
};

const isUnique = (field, value) => {
  return !users.some((user) => user[field] === value);
};

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const userInfo = {
    userNameInput: username.value.trim(),
    emailInput: email.value.trim(),
    firstNameInput: firstname.value.trim(),
    lastNameInput: lastname.value.trim(),
    passwordInput: btoa(password.value.trim()),
    ageInput: age.value.trim(),
  };

  if (
    userInfo.userNameInput.length < 4 ||
    userInfo.firstNameInput.length < 2 ||
    userInfo.lastNameInput.length < 2
  ) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Username must have at least 4 characters, and First Name and Last Name must have at least 2 characters.`;
    return;
  }

  if (!isValidEmail(userInfo.emailInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Invalid email format.`;
    return;
  }

  if (!isValidPassword(password.value.trim())) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Password must be at least 6 characters, with one uppercase letter, one lowercase letter, one number, and one special character.`;
    return;
  }

  if (
    isNaN(userInfo.ageInput) ||
    userInfo.ageInput < 1 ||
    userInfo.ageInput > 99
  ) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Age must be a valid number between 1 and 99.`;
    return;
  }

  if (!isUnique("userNameInput", userInfo.userNameInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Username is already taken.`;
    return;
  }

  if (!isUnique("emailInput", userInfo.emailInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Email is already registered.`;
    return;
  }

  users.push(userInfo);
  writeToLS("users", users);
  writeToLS("loggedUser", userInfo);

  const el = document.createElement("p");
  el.innerText = userInfo.userNameInput;
  usersToShow.appendChild(el);

  window.location.assign("./home.html");
});
