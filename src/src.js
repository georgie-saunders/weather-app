// time and day
let now = new Date();
let currentday = document.querySelector("#current-day");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentday.innerHTML = `${day}, ${hours}:${minutes}`;

// city, temp and details

function showWeather(response) {
  let temp = document.querySelector("#temperature");
  cTemp = response.data.main.temp;
  let temperature = Math.round(cTemp);
  temp.innerHTML = `${temperature}`;

  let city = document.querySelector("#city");
  let cityname = response.data.name;
  city.innerHTML = `${cityname}`;

  let description = document.querySelector("#weatherDescription");
  let descript = response.data.weather[0].description;
  description.innerHTML = `${descript}`;

  let feelTemp = document.querySelector("#feelsLike");
  let feelTemperature = Math.round(response.data.main.feels_like);
  feelTemp.innerHTML = `${feelTemperature}`;

  let windSpeed = document.querySelector("#wind");
  let windValue = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${windValue}`;

  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// show current location temp and details

function retrievePosition(position) {
  let apiKey = "3dd2c190c7f10449ee93c37b4f22cf04";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let yourLocation = document.querySelector("#currentLocation");
yourLocation.addEventListener("click", showWeather);

navigator.geolocation.getCurrentPosition(retrievePosition);

// show city and weather results

function showSearchLocation(event) {
  event.preventDefault();
  let apiKey = "3dd2c190c7f10449ee93c37b4f22cf04";
  let cityName = document.querySelector("#cityInput");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let searchLocation = document.querySelector("#citySearch");
searchLocation.addEventListener("click", showSearchLocation);

// change unit to F
function showFtemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let fTemp = (cTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fTemp);
}

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFtemp);

// change unit to C
function showCtemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(cTemp);
}

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", showCtemp);

let cTemp = null;
