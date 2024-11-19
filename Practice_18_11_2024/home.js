import { readFromLS } from "./util.js";

const currentUserInfo = document.querySelector(".currentUser");

const loggedUser = readFromLS("loggedUser") || false;

console.log(loggedUser);
if (!loggedUser) {
  location.assign("./register.html");
}
const { firstNameInput, emailInput } = loggedUser;

currentUserInfo.innerHTML = `Hello ${firstNameInput} ${emailInput}`;
