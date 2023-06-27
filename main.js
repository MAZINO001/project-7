const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcons = document.querySelectorAll(".icons span");

// Getting the current year and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

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

const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // Getting the first day of the month
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // Getting the last date of the month
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // Getting the last day of the month
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // Getting the last date of the previous month
  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    // Create li tags for the previous month's last days
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    // Create li tags for all the days of the current month
    let isToday =
      i === date.getDate() &&
      currMonth === date.getMonth() &&
      currYear === date.getFullYear()
        ? "active"
        : "";

    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    // Create li tags for the next month's first days
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcons.forEach((icon) => {
  // Adding click event on both icons
  icon.addEventListener("click", () => {
    // If prev clicked, get the previous month; if next, get the next month
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // When the year ends, adjust the date and update the current year and month
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    }
    renderCalendar();
  });
});
