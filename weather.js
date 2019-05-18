const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEYS = "1bb7ed76cbc6f331eae63517610cd26d";

function getWeater(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEYS}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} \t ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeater(latitude, longitude);
}
function handleGeoFailed() {
  console.log("Can't acces geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoFailed);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords == null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeater(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}

init();
