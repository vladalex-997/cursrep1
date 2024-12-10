import { writeToLS, readFromLS, removeFromLS } from "./util.js";

const users = readFromLS("users") || [];

// Salvarea notițelor într-un obiect
const notes = {};

// Functie pentru a genera calendarul
function generateCalendar(month, year) {
  const calendarDaysContainer = document.getElementById("calendar-days");
  const monthYear = document.getElementById("monthYear");

  // Setează titlul lunii și anului
  monthYear.textContent = `${getMonthName(month)} ${year}`;

  // Șterge zilele anterioare
  calendarDaysContainer.innerHTML = "";

  // Ziua de început a lunii (de la care începe calendarul)
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Adăugăm zilele din luna precedentă
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-day", "disabled");
    calendarDaysContainer.appendChild(emptyCell);
  }

  // Adăugăm zilele din luna curentă
  for (let i = 1; i <= lastDate; i++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");
    dayCell.textContent = i;

    // Afișăm notițele dacă există pentru această zi
    if (notes[`${year}-${month + 1}-${i}`]) {
      const noteText = document.createElement("div");
      noteText.textContent = notes[`${year}-${month + 1}-${i}`];
      noteText.classList.add("note-text");
      dayCell.appendChild(noteText);
    }

    // Adăugăm event listener pentru a deschide fereastra de notițe
    dayCell.addEventListener("click", () => openNoteModal(year, month, i));
    calendarDaysContainer.appendChild(dayCell);
  }
}

// Funcție pentru a obține numele lunii
function getMonthName(month) {
  const months = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];
  return months[month];
}

// Funcție pentru a naviga la luna anterioară
function goToPreviousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
}

// Funcție pentru a naviga la luna următoare
function goToNextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
}

// Deschide modalul pentru notițe
function openNoteModal(year, month, day) {
  const noteModal = document.getElementById("note-modal");
  const noteInput = document.getElementById("note-input");
  const saveNoteButton = document.getElementById("save-note");

  window.addEventListener("load", () => {
    notes = readFromLS("users");
  });

  // Setăm data pentru care adăugăm notița
  noteModal.style.display = "flex";
  noteInput.value = notes[`${year}-${month + 1}-${day}`] || ""; // Dacă există notițe pentru ziua respectivă, le precompletăm

  // Salvează notița
  saveNoteButton.onclick = () => {
    notes[`${year}-${month + 1}-${day}`] = noteInput.value;
    generateCalendar(currentMonth, currentYear); // Re-generăm calendarul pentru a afișa notițele
    noteModal.style.display = "none";

    writeToLS("users", notes);
  };
}
console.log(readFromLS("users"));

// Închide modalul
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("note-modal").style.display = "none";
});

// Setările inițiale pentru luna curentă și anul curent
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Inițializează calendarul
generateCalendar(currentMonth, currentYear);

// Adăugăm evenimente pentru butoane
document
  .getElementById("prevMonth")
  .addEventListener("click", goToPreviousMonth);
document.getElementById("nextMonth").addEventListener("click", goToNextMonth);
