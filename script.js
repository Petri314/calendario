const calendarTable = document.getElementById('calendarTable').querySelector('tbody');
const monthYear = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentYear = 2025;
let currentMonth = 0;
const weekColors = ['week0', 'week1', 'week2'];

function generateCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const today = new Date();

    calendarTable.innerHTML = '';
    monthYear.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;

    let day = 1;
    let weekNumber = getWeekNumber(year, month, 1);
    let weekColorIndex = (weekNumber - 1) % 3;
    let isFirstWeek = true;

    while (day <= lastDayOfMonth.getDate()) {
        const row = document.createElement('tr');
        const weekCell = document.createElement('td');
        weekCell.textContent = weekNumber;
        row.appendChild(weekCell);

        // Fix: Ensure week color consistency across month transitions
        row.classList.add(weekColors[weekColorIndex]);

        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            if ((isFirstWeek && i < firstDayWeek) || day > lastDayOfMonth.getDate()) {
                cell.textContent = '';
            } else {
                cell.textContent = day;
                if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
                    cell.classList.add('today');
                }
                day++;
            }
            row.appendChild(cell);
        }

        calendarTable.appendChild(row);

        if (day <= lastDayOfMonth.getDate()) {
            weekNumber++;
            weekColorIndex = (weekColorIndex + 1) % 3;
        }

        isFirstWeek = false;
    }
}

function getWeekNumber(year, month, day) {
    const date = new Date(year, month, day);
    const startOfYear = new Date(year, 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}

prevMonthButton.addEventListener('click', () => {
    if (currentYear === 2025 && currentMonth === 0) {
        return; // No se permite ir a años anteriores a 2025
    }
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
});

generateCalendar(currentYear, currentMonth);
