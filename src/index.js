let now = new Date();

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = days[now.getDay()];

let date = now.getDate();

let months = [
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
  "December"
];
let month = months[now.getMonth()];

function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp);
}

function locationSearch(event) {
  event.preventDefault();
  let apiKey = "86f093aa43690ee890e5cd351bb4c53c";
  let city = document.querySelector("#input-current-city").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = `${city}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getWeather (response) {
  let currentLocation = response.data.name;
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = `${currentLocation}`;
  document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "86f093aa43690ee890e5cd351bb4c53c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(getWeather);
}

let locate = document.querySelector("#current-location");
locate.addEventListener("click", handlePosition);

navigator.geolocation.getCurrentPosition(handlePosition);
let form = document.querySelector("#form-place");
form.addEventListener("submit", locationSearch);
