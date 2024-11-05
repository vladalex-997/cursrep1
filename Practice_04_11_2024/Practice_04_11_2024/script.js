// const arr = [];

// const str = "";

// console.log(arr.length);
// console.log(!arr.length);
// console.log(!!arr.length);

// console.log(!!str);

// const container = document.getElementById("container");
// const containerClass = document.getElementsByClassName("containerClass");
// const divTag = document.getElementsByTagName("div");
// console.log(container);
// console.log(containerClass);
// console.log(divTag);

// const containerQuerySelector = document.querySelector(".containerClass");

// console.log(containerQuerySelector);

// const querySelectorAll = document.querySelectorAll(".mainSection");
// console.log(querySelectorAll);

const bottom = document.querySelector(".bottom");
bottom.innerText = "gigi";
bottom.innerHTML = "<h1>gigi</h1>";
// bottom.style.color = "red";
bottom.classList.add("color");
bottom.classList.remove("color");

// function createADivDynamic(messageToDisplay, className) {
//   const div = document.createElement("div");
//   div.innerText = "Acesta este un div creat dinamic";
//   div.classList.add("dynamicDiv");
//   bottom.appendChild(div);
// }

const createADivDynamic = (messageToDisplay, className) => {
  const paragraph = document.createElement("p");
  paragraph.innerText = messageToDisplay;
  paragraph.classList.add(className);
  bottom.appendChild(paragraph);
  console.log(messageToDisplay);
};

createADivDynamic("ala bala", "dynamicDiv");
createADivDynamic("Adrian", "Adrian");

const counterDisplay = document.getElementById("counter");
const incrementButton = document.getElementById("incrementButton");
const decrementButton = document.getElementById("decrementButton");
const input = document.getElementById("inputGigi");

console.log(counter, incrementButton, decrementButton);

let counterValue = 0;

const updateDisplay = () => {
  counterDisplay.innerText = counterValue;
};

incrementButton.addEventListener("click", () => {
  const hasClass = !!document.getElementsByClassName("error").length;
  console.log(hasClass);
  if (hasClass) {
    counterDisplay.classList.remove("error");
  }
  counterValue++;
  updateDisplay();
});

decrementButton.addEventListener("click", () => {
  console.log(counterValue);
  if (counterValue > 0) {
    counterValue--;
    updateDisplay();
    return;
  }
  counterDisplay.innerText = "No negative values allowed";
  counterDisplay.classList.add("error");
});
