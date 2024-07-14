let dateInput = document.getElementById("date");
let dayInput = document.getElementById("day");
let timeInput = document.getElementById("time");
let nameInput = document.getElementById("name");
let complain = document.getElementById("complain");
let showYear = document.getElementById("currentYear");

const monthArr = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let fullDate = new Date();
let currDate = fullDate.getDate();
let currDay = fullDate.getDay();
let currMonth = fullDate.getMonth();
let currHour = fullDate.getHours();
let currMin = fullDate.getMinutes();
let currYear = fullDate.getFullYear();

// formating date & time
// currHour = currHour % 12;
// currHour = currHour ? currHour : 12;
let timeStr = fullDate.toLocaleTimeString();
timeInput.value = timeStr;
dayInput.value = dayNames[currDay];
if (currDate <= 9) {
	currDate = "0" + currDay;
	console.log(currDay);
} else {
	currDate = currDate;
}
const currDateStr = `${currDate}-${monthArr[currMonth]}-${currYear}`;
dateInput.value = currDateStr;
showYear.innerText = currYear;

// for google sheet
let sheetUrl =
	"https://script.google.com/macros/s/AKfycbyVdnyPVi6BYRrVp17EZWRQCk-7Z8psZs6-sZUcdSGoey4Qo2t4PN5wbzafAJJfOH9lLA/exec";

let form = document.getElementById("complainForm");
form.addEventListener("submit", (e) => {
	e.target.btn.innerHTML = "Submitting Complain....";
	let data = new FormData(form);
	fetch(sheetUrl, {
		method: "POST",
		body: data,
	})
		.then((res) => res.text())
		.then((finalRes) => {
			e.target.btn.innerHTML = "Submit Complain";
			nameInput.value = "";
			complain.value = "";
			const Toast = Swal.mixin({
				toast: true,
				position: "bottom-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			});
			Toast.fire({
				icon: "success",
				title: "Your complaint has successfully reached the IT department",
			});
		});
	e.preventDefault();
});

// Made By Asheel Ahmed
