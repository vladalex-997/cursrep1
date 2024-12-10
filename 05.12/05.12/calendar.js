const calendar = document.querySelector("#calendar");
const dates = document.querySelector("#dates");
const currentMonth = document.querySelector("h3");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

// Obiect pentru a salva notele
const notes = {};

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  // Zile inactive din luna anterioară
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  // Zilele curente ale lunii
  for (let i = 1; i <= endDate; i++) {
    const isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    const noteKey = `${year}-${month + 1}-${i}`;
    const noteText = notes[noteKey] ? `<span class="note">${notes[noteKey]}</span>` : "";

    datesHtml += `<li class="${isToday ? "today" : ""}" data-date="${noteKey}">
                    ${i} ${noteText}
                  </li>`;
  }

  // Actualizare DOM
  dates.innerHTML = datesHtml;
  currentMonth.textContent = `${months[month]} ${year}`;

  // Adăugare evenimente de click pentru zile
  document.querySelectorAll("#dates li:not(.inactive)").forEach((day) => {
    day.addEventListener("click", handleDayClick);
  });
}

function handleDayClick(event) {
  const selectedDate = event.target.getAttribute("data-date");
  const note = prompt("Adaugă o notă pentru această zi:", notes[selectedDate] || "");

  if (note !== null) {
    if (note.trim() !== "") {
      notes[selectedDate] = note; // Salvează nota
    } else {
      delete notes[selectedDate]; // Șterge nota dacă e goală
    }
    renderCalendar(); // Re-randează calendarul pentru a afișa nota
  }
}

function updateDate(btnId) {
  if (btnId === "prev" && month === 0) {
    year--;
    month = 11;
  } else if (btnId === "next" && month === 11) {
    year++;
    month = 0;
  } else {
    month = btnId === "next" ? month + 1 : month - 1;
  }
  date = new Date(year, month, new Date().getDate());
}

// Inițializare calendar
renderCalendar();

// Navigare între luni
navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;
    updateDate(btnId);
    renderCalendar();
  });
});
