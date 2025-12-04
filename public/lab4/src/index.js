
// example taken from https://www.w3schools.com/html/html5_geolocation.asp

const x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(placeLocation, error);
  } else {
  }
}

function placeLocation(position) {
  locations.unshift({latitude: position.coords.latitude, longitude: position.coords.longitude, data: ""});
  populateElemLocations();
}

function error() {
  alert("Sorry, no position available.");
}

getLocation()

// example end

const locations = [
  {latitude: 52.9261184, longitude: 30.3497216, data: ""}
]
const elemLocations = document.getElementsByClassName('locations-list')[0];

// example from https://www.omi.me/blogs/api-guides/how-to-fetch-weather-data-using-open-meteo-api-in-javascript
async function getWeather (latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
  let days = [];
  await fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let temperatures = data.hourly.temperature_2m;
    for (let i = 0; i < 7; i++){
      let avgTemp = 0;
      for (let j = 24 * i; j < 24 * (i + 1); j++){
        avgTemp += temperatures[i]; 
      }
      avgTemp = avgTemp / 24;
      days.push(avgTemp);
    }
  });
  return days;
}


async function populateElemLocations(){
  if (locations.length == 0){
    return;
  }
  console.log("populating", locations);
  let elemLocationsList = elemLocations.getElementsByTagName('ul')[0];
  elemLocationsList.textContent = '';
  for (let location of locations){
    if (location.data == ""){
      location.data = (await getWeather(location.latitude, location.longitude)).toString()
      console.log("done pulling data for ", location)
    }
    console.log("moving on to fill ", location)
    let elemLocation = document.createElement('li');
    elemLocation.textContent = 'latutude' + location.latitude + 'longitude' + location.longitude + 'weather data: ' + location.data;
    elemLocationsList.appendChild(elemLocation);
  }
}

populateElemLocations()
