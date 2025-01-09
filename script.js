// script.js
const calendarContainer = document.getElementById("calendar");
const currentMonthSpan = document.getElementById("current-month");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

const daysOfWeek = ["Semana", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const turnos = ["tarde", "manana", "noche"];

let currentYear = 2025;
let currentMonth = 0;
let currentTurnIndex = 0; // Starting with "tarde"

function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

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

    let currentWeekNumber = getWeekNumber(firstDay);

    // Empty cells for days before the first of the month
    let rowStarted = false;
    for (let i = 0; i < startOffset; i++) {
        if (!rowStarted) {
            const weekCell = document.createElement("div");
            weekCell.className = "day week-number";
            weekCell.textContent = currentWeekNumber;
            calendarContainer.appendChild(weekCell);
            rowStarted = true;
        }
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        calendarContainer.appendChild(emptyCell);
    }

    // Days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);

        // Add week number at the start of a new week
        if (date.getDay() === 1 || (day === 1 && startOffset === 0)) {
            const weekCell = document.createElement("div");
            weekCell.className = "day week-number";
            weekCell.textContent = getWeekNumber(date);
            calendarContainer.appendChild(weekCell);
        }

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

    // Fill in remaining cells to complete the grid
    const totalCells = calendarContainer.children.length;
    const cellsToAdd = Math.ceil(totalCells / 8) * 8 - totalCells;

    for (let i = 0; i < cellsToAdd; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        calendarContainer.appendChild(emptyCell);
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
