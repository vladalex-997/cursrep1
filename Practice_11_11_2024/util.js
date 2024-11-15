export const checkBusinessHours = (openingHour, closingHour) => {
  //   const openingHour = 9;
  //   const closingHour = 17;
  let waitHours = 0;
  const userInput = Number(
    prompt("At what hour you would like to visit the store?")
  );
  if (userInput < 0 || userInput > 23 || isNaN(userInput)) {
    alert("Please enter a valid hour between 0 and 23");
    return waitHours;
  }

  if (userInput >= openingHour && userInput < closingHour) {
    alert("Everything is fine");
  } else {
    if (userInput >= closingHour) {
      waitHours = 24 - userInput + openingHour;
    } else {
      waitHours = openingHour - userInput;
    }
    alert(`Sorry, we're closed, please come back in ${waitHours} hours`);
  }
  return waitHours;
};
