function round(number, precision = 1){
  return Math.round(
    number * Math.pow(10, precision)
  ) / Math.pow(10, precision);
}

// example taken from https://www.w3schools.com/html/html5_geolocation.asp

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(placeLocation, error);
  } else {
  }
}

function placeLocation(position) {
  locations.unshift({latitude: position.coords.latitude, longitude: position.coords.longitude, data: '', place: 'Current location'});
  populateElemLocations();
}

function error() {
  alert('Sorry, no position available.');
}

// example end

// example from https://www.omi.me/blogs/api-guides/how-to-fetch-weather-data-using-open-meteo-api-in-javascript
async function getWeather (latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
  let days = [];
  await fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    days = parseWeatherData(data);
  });
  return days;
}


function parseWeatherData(data){
  let days = [];
  let temperatures = data.hourly.temperature_2m;
    for (let i = 0; i < 7; i++){
      let avgTemp = 0;
      let minTemp = 1000;
      let maxTemp = -1000;
      for (let j = 24 * i; j < 24 * (i + 1); j++){
        let roundTemp = round(temperatures[i], 1);
        avgTemp += roundTemp; 
        if (roundTemp < minTemp){
          minTemp = roundTemp;
        }
        if (roundTemp > maxTemp){
          maxTemp = roundTemp;
        }
      }
      avgTemp = round(avgTemp / 24, 2);
      days.push([avgTemp, minTemp, maxTemp]);
    }
  return days;
}

async function populateElemLocations(){
  if (locations.length == 0){
    return;
  }
  let elemLocationsList = elemLocations.getElementsByTagName('ul')[0];
  elemLocationsList.textContent = '';
  for (let location of locations){
    if (location.data == ''){
      location.data = await getWeather(location.latitude, location.longitude)
      elemLocationsList.append(fillElement(location));
    }
    else{
      elemLocationsList.append(fillElement(location));
    }
  }
  localStorage.setItem('locations', JSON.stringify(locations));
}

function fillElement(location){
  let elemLocation = document.createElement('li');
  elemLocation.textContent = location.place + ' latutude' + location.latitude + 'longitude' + location.longitude;
  for (let i = 0; i < 7; i++){
    let dayData = location.data[i];
    let elemLocationDay = document.createElement('div');
    elemLocationDay.textContent = 'Max: ' + dayData[2] + ', min: ' + dayData[1];
    elemLocation.appendChild(elemLocationDay);
  }
  return elemLocation;
}

let locations = [
  {latitude: 55.9261184, longitude: 37.3497216, data: '', place: 'Moscow'}
]
const elemLocations = document.getElementsByClassName('locations-list')[0];

if (localStorage.getItem('locations')){
  locations = JSON.parse(localStorage.getItem('locations'));
}

async function setupPage(){
  if (locations[0].place != 'Current location'){
    await getLocation()
  }

  let todaysDate = new Date().toISOString().slice(0, 10);

  if (localStorage.getItem('date') != todaysDate){
    for (let location of locations){
      console.log(location);
      location.data = '';
    }
  }
  
  localStorage.setItem('date', todaysDate);

  populateElemLocations()
}

setupPage();

