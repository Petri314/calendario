// script.js
const calendarContainer = document.getElementById("calendar");
const currentMonthSpan = document.getElementById("current-month");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const turnos = ["tarde", "manana", "noche"];

let currentYear = 2025;
let currentMonth = 0;
let currentTurnIndex = 0; // Starting with "tarde"

function generateCalendar(year, month) {
    calendarContainer.innerHTML = ""; // Clear previous calendar

    // Set current month name
    currentMonthSpan.textContent = `${months[month]} ${year}`;

    // Add day headers
    daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.className = "day header";
        header.textContent = day;
        calendarContainer.appendChild(header);
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Calculate the correct starting position (Monday as first day of the week)
    let startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    // Empty cells for days before the first of the month
    for (let i = 0; i < startOffset; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        calendarContainer.appendChild(emptyCell);
    }

    // Days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dayDiv = document.createElement("div");
        dayDiv.className = `day ${turnos[currentTurnIndex]}`;
        dayDiv.textContent = day;

        // Highlight current day
        const today = new Date();
        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            dayDiv.classList.add("current-day");
        }

        calendarContainer.appendChild(dayDiv);

        // Update turn index weekly
        if (date.getDay() === 0) { // Sunday ends the week
            currentTurnIndex = (currentTurnIndex + 1) % turnos.length;
        }
    }
}

// Change month handlers
prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
});

nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
});

// Initial load
generateCalendar(currentYear, currentMonth);