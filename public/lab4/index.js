const PERIODS = {0: 'night', 1: 'morning', 2: 'afternoon', 3: 'evening'};
const WEEKDAYS = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'};
const MAP_LOCATIONS = {
  'St Petersburg': [59.938886, 30.313838],
  'Veliky Novgorod': [58.523342, 31.267735],
  'Moscow': [55.763263, 37.613748],
  'Yekaterinburg': [56.882507, 60.543053],
  'Novosibirsk': [55.055589, 82.910959],
}
let curr_location = '';

function round(number, precision = 1){
  return Math.round(
    number * Math.pow(10, precision)
  ) / Math.pow(10, precision);
}

//let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

let nDays = 3;

function getListedPlaces(){
  let listedPlaces = [];
  for (let location of locations){
    listedPlaces.push(location.place);
  }
  return listedPlaces;
}

async function refreshWeatherData(){
  elemLocationsList.textContent = '';
  for (let location of locations){
    location.data = await getWeather(location.latitude, location.longitude);
  }
  localStorage.setItem('locations', JSON.stringify(locations));
  populateElemLocations();
}

function parseWeatherData(data){
  let days = [];
  let temperatures = data.hourly.temperature_2m;
    for (let i = 0; i < nDays; i++){
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
        avgTemp = round(avgTemp / 6, 1);
        periods.push([avgTemp, minTemp, maxTemp]);
      }
      days.push([data.hourly.time[i*24], periods]);
    }
  return days;
}

async function populateElemLocations(){
  if (curr_location == "" && locations.length == 0){
    return;
  }
  if (curr_location != ""){
    let elemLocList = elemLocationsList[0].getElementsByTagName('ul')[0];
    elemLocList.textContent = '';
    fillElement(curr_location, elemLocList);
    let elemLocHeader = elemLocationsList[0].getElementsByTagName('h3')[0];
    elemLocHeader.textContent = curr_location.place;
  }
  for (let i = 0; i < locations.length; i++){
    let elemLocList = elemLocationsList[i+2].getElementsByTagName('ul')[0];
    elemLocList.textContent = '';
    fillElement(locations[i], elemLocList);
    let elemLocHeader = elemLocationsList[i+2].getElementsByTagName('h3')[0];
    elemLocHeader.textContent = locations[i].place;
  }
}

async function createLocationEntry(place){
  if (getListedPlaces().includes(place) || place == ""){
    return;
  }
  let entry = {latitude: MAP_LOCATIONS[place][0], longitude: MAP_LOCATIONS[place][1], data: '', place: place};
  entry.data = await getWeather(entry.latitude, entry.longitude);
  locations.push(entry);
  populateElemLocations();
  localStorage.setItem('locations', JSON.stringify(locations));
}

function fillElement(location, list){
  if (location.data == undefined){
    return;
  }
  for (let i = 0; i < nDays; i++){
    let dayData = location.data[i];
    let elemLocationDay = document.createElement('li');
    let elemLocationDayHeader = document.createElement('span');
    elemLocationDayHeader.textContent = WEEKDAYS[new Date(dayData[0].slice(0, 10)).getDay()];
    elemLocationDay.appendChild(elemLocationDayHeader);
    let elemLocationDayEntries = document.createElement('div');
    elemLocationDayEntries.classList.add('location-data-entries');
    elemLocationDay.appendChild(elemLocationDayEntries);
    for (let k = 0; k < 4; k++){
      let elemLocationDayEntry = document.createElement('div');
      elemLocationDayEntry.classList.add('location-data-entry');
      let periodData = dayData[1][k];
      let elemLocationDayPeriod = document.createElement('span');
      elemLocationDayPeriod.textContent = PERIODS[k];
      let elemLocationDayValue = document.createElement('span');
      elemLocationDayValue.textContent = periodData[0];
      elemLocationDayEntry.appendChild(elemLocationDayPeriod);
      elemLocationDayEntry.appendChild(elemLocationDayValue);
      elemLocationDayEntries.appendChild(elemLocationDayEntry);
    }
    list.appendChild(elemLocationDay);
  }
}

let locations = [
]
const elemLocationsList = document.getElementsByClassName('location-data');

if (localStorage.getItem('locations')){
  locations = JSON.parse(localStorage.getItem('locations'));
}

function purgeCurrLocation(){
  for (let i = 0; i < locations.length; i++){
    if (locations[i].place == 'Current location'){
      locations.splice(i, 1);
      localStorage.setItem('locations', JSON.stringify(locations));
      break;
    }
  }
}

async function setupPage(){
  for (let location of locations){
    location.data = await getWeather(location.latitude, location.longitude);
  }
  populateElemLocations()

  localStorage.setItem('locations', JSON.stringify(locations));
}

setupPage();

async function addCurentLocation(position){
  console.log("Position: ", position)
  let entry = {latitude: position.coords.latitude, longitude: position.coords.longitude, data: '', place: 'Current location'};
  entry.data = await getWeather(entry.latitude, entry.longitude);
  if (curr_location != entry){
    curr_location = entry;
    populateElemLocations();
  }
}

const elemCurrLocations = document.getElementsByClassName('location-data');
const watchID = navigator.geolocation.watchPosition((position) => {
  if (curr_location == ''){
    addCurentLocation(position);
  }
});


const refresh_btn = document.getElementById('refresh-btn');
refresh_btn.addEventListener('click', () =>{
  refreshWeatherData();
})

const places_list = document.createElement('select');
const places_list_header = document.createElement('option');
places_list_header.value = "";
places_list_header.textContent = 'Choose a city';
places_list.appendChild(places_list_header);

for (const [key, value] of Object.entries(MAP_LOCATIONS)) {
  let places_list_entry = document.createElement('option');
  places_list_entry.value = key;
  places_list_entry.textContent = key;
  places_list.appendChild(places_list_entry);
}

const add_place = document.createElement('button');
add_place.addEventListener('click', () =>{
  createLocationEntry(places_list.value);
})
add_place.textContent = '+';

const main = document.getElementsByTagName('main')[0];
main.appendChild(places_list);
main.appendChild(add_place);

function populateCitiesLists(){
  let citiesLists = document.getElementsByClassName('datalist-cities');
  for (let list of citiesLists){
    for (let [place, coords] of Object.entries(MAP_LOCATIONS)){
      let elemPlace = document.createElement('option');
      elemPlace.value = place;
      list.appendChild(elemPlace);
    }
  }
}
populateCitiesLists();

