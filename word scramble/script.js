let originalWord = "";

document.getElementById("scrambleButton").addEventListener("click", () => {
  const input = document.getElementById("wordInput").value;
  if (!input) {
    document.getElementById("result").textContent = "Please enter a word.";
    return;
  }

  originalWord = input;
  const scrambled = input
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("   ");

  document.getElementById("result").textContent = scrambled;
});

document.getElementById("unscrambleButton").addEventListener("click", () => {
  if (!originalWord) {
    document.getElementById("result").textContent = "No word to unscramble.";
    return;
  }

  document.getElementById("result").textContent = originalWord
    .split("")
    .join("   ");
});
