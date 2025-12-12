const PERIODS = {0: 'night', 1: 'morning', 2: 'afternoon', 3: 'evening'};
const WEEKDAYS = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'};
function round(number, precision = 1){
  return Math.round(
    number * Math.pow(10, precision)
  ) / Math.pow(10, precision);
}

var getLocation = new Promise(function(resolve, reject) {
  if (!(navigator.geolocation)) {
    reject();
  }
  navigator.geolocation.getCurrentPosition(function(position){
    let entry = {latitude: position.coords.latitude, longitude: position.coords.longitude, data: '', place: 'Current location'};
    resolve(entry);
  }) 
})

//let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// example end

// example from https://www.omi.me/blogs/api-guides/how-to-fetch-weather-data-using-open-meteo-api-in-javascript
async function getWeather (latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`;
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
      let periods = [];
      for (let k = 0; k < 4; k++){
        let avgTemp = 0;
        let minTemp = 1000;
        let maxTemp = -1000;
        for (let j = 24 * i + (6 * k); j < 24 * (i) + (6 * (k+1)); j++){
          let roundTemp = round(temperatures[j], 1);
          avgTemp += roundTemp; 
          if (roundTemp < minTemp){
            minTemp = roundTemp;
          }
          if (roundTemp > maxTemp){
            maxTemp = roundTemp;
          }
        }
        avgTemp = round(avgTemp / 24, 2);
        periods.push([avgTemp, minTemp, maxTemp]);
      }
      days.push([data.hourly.time[i*24], periods]);
    }
  return days;
}

async function populateElemLocations(){
  console.log('populating', locations);
  if (locations.length == 0){
    return;
  }
  let elemLocationsList = elemLocations.getElementsByTagName('ul')[0];
  elemLocationsList.textContent = '';
  for (let location of locations){
    elemLocationsList.append(fillElement(location));
  }
}

function fillElement(location){
  console.log('filling', location);
  let elemLocation = document.createElement('li');
  elemLocation.textContent = location.place;
  for (let i = 0; i < 7; i++){
    let dayData = location.data[i];
    let elemLocationDay = document.createElement('div');
    elemLocationDay.textContent = WEEKDAYS[new Date(dayData[0].slice(0, 10)).getDay()];
    for (let k = 0; k < 4; k++){
      let periodData = dayData[1][k];
      let elemLocationDayPeriod = document.createElement('div');
      elemLocationDayPeriod.textContent = PERIODS[k] + ' Max: ' + periodData[2] + ', min: ' + periodData[1];
      elemLocationDay.appendChild(elemLocationDayPeriod);
    }
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
  let todaysDate = new Date().toISOString().slice(0, 10);

  if (localStorage.getItem('date') != todaysDate){
    for (let location of locations){
      location.data = '';
    }
  }
  
  for (let location of locations){
    if (location.data == ''){
      location.data = await getWeather(location.latitude, location.longitude);
    }
  }

  localStorage.setItem('date', todaysDate);
  console.log("??");
  populateElemLocations()

  localStorage.setItem('locations', JSON.stringify(locations));
}

if (navigator.geolocation && locations[0].place != 'Current location'){
  getLocation.then(
    (entry) => {console.log("??!!!"), locations.unshift(entry), setupPage()},
    () => {console.log("??!!!!!!!"), setupPage()}
  )
}
else{
  setupPage();
}


