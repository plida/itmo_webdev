const PERIODS = {0: 'night', 1: 'morning', 2: 'afternoon', 3: 'evening'};
const PERIODS_ICONS = {0: './media/icon_night.png', 1: './media/icon_morning.png', 2: './media/icon_afternoon.png', 3: './media/icon_evening.png'}
const WEEKDAYS = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TEMP_COLORS = {
  140: '#ffb0b0',
  130: '#ffd7b0',
  120: '#fff7b0',
  110: '#dfffb0',
  100: '#b0ffed',
  90: '#b0f1ff',
  80: '#b0d7ff',
  70: '#b0c0ff',
  0: 'rgba(158, 154, 255, 1)'
}
let MAP_LOCATIONS = {
  'St Petersburg': [59.938886, 30.313838],
  'Veliky Novgorod': [58.523342, 31.267735],
  'Moscow': [55.763263, 37.613748],
  'Yekaterinburg': [56.882507, 60.543053],
  'Novosibirsk': [55.055589, 82.910959],
}
let curr_location = '';
let curr_target = document.getElementsByClassName('current-location__manual')[0];

function round(number, precision = 1){
  return Math.round(
    number * Math.pow(10, precision)
  ) / Math.pow(10, precision);
}

const curr_loc_geo = document.getElementsByClassName('current-location__geolocation')[0];
curr_loc_geo.classList.add('hidden');
const curr_loc_man_ch = document.getElementsByClassName('current-location__manual-choice')[0];
curr_loc_man_ch.classList.add('hidden');
const curr_loc_man = document.getElementsByClassName('current-location__manual')[0];
curr_loc_man.classList.add('hidden');


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
    listedPlaces.unshift(location.place);
  }
  return listedPlaces;
}

async function refreshWeatherData(){
  if (curr_location != ""){
    curr_location.data = await getWeather(curr_location.latitude, curr_location.longitude);
  }
  for (let location of locations){
    location.data = await getWeather(location.latitude, location.longitude);
  }
  localStorage.setItem('locations', JSON.stringify(locations));
  let elemLocList = curr_target.getElementsByTagName('ul')[0];
  elemLocList.textContent = 'loading...';
  for (let i = 0; i < locations.length; i++){
    let elemLocList = elemLocationsList[i+2].getElementsByTagName('ul')[0];
    elemLocList.textContent = 'loading...';
  }
  setTimeout(populateCurrentLocation, 100);
  setTimeout(populateElemLocations, 100);
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

async function populateCurrentLocation(){
  if (curr_location == ""){
    return;
  }
  let elemLocList = curr_target.getElementsByTagName('ul')[0];
  elemLocList.textContent = '';
  fillElement(curr_location, elemLocList);
  let current_weather = document.getElementsByClassName('current-weather')[0].getElementsByTagName('span')[0];
  let index = Math.floor(new Date().getHours() / 6);
  console.log(curr_location.data[0][1], index);
  let value = curr_location.data[0][1][index][0];
  let current_weather_image = document.getElementsByClassName('current-weather')[0].getElementsByTagName('img')[0];
  current_weather_image.src = PERIODS_ICONS[index];
  if (value > 0){
    current_weather.textContent = '+' + value + '°C';
  }
  else{
    current_weather.textContent = value + '°C';
  }
}

async function populateElemLocations(){
  if (locations.length == 0){
    return;
  }

  while (elemLocationsList.length > 2){
    elemLocationsList[2].remove();
  }

  for (let i = 0; i < locations.length; i++){
    createElemLocation(locations[i]);
    let elemLocList = elemLocationsList[i+2].getElementsByTagName('ul')[0];
    elemLocList.textContent = '';
    fillElement(locations[i], elemLocList);
  }
}

async function createLocationEntry(place){
  if (getListedPlaces().includes(place) || place == ""){
    return;
  }
  if (place in MAP_LOCATIONS == false){
    console.log('doesnt exist!');
    return;
  }
  let entry = {latitude: MAP_LOCATIONS[place][0], longitude: MAP_LOCATIONS[place][1], data: '', place: place};
  entry.data = await getWeather(entry.latitude, entry.longitude);
  locations.unshift(entry);
  populateElemLocations();
  localStorage.setItem('locations', JSON.stringify(locations));
}

const elemLocations = document.getElementsByClassName('locations')[0];

function createElemLocation(location){
  let locationData = document.createElement('section');
  locationData.classList.add('location-data');
  elemLocations.appendChild(locationData);
  let locationHeader = document.createElement('h3');
  locationHeader.textContent = location.place;
  locationData.appendChild(locationHeader);
  let locationByDay = document.createElement('div');
  locationByDay.classList.add('location-data-byday');
  locationData.appendChild(locationByDay);
  let locationList = document.createElement('ul');
  locationByDay.appendChild(locationList);
}

function colorTemperature(elem, value){
  let tempValues = Object.keys(TEMP_COLORS).sort(function(a, b) { return b - a; });
  for (let temp of tempValues){
    if (value > temp - 100){
      elem.style.background = TEMP_COLORS[temp];
      return;
    }
  }
  elem.style.background = TEMP_COLORS[0];
}

function fillElement(location, list){
  if (location.data == undefined){
    return;
  }
  for (let i = 0; i < nDays; i++){
    let dayData = location.data[i];
    let elemLocationDay = document.createElement('li');
    let elemLocationDayHeader = document.createElement('span');
    elemLocationDayHeader.textContent = WEEKDAYS[new Date(dayData[0]).getDay()] + ' ' + MONTHS[parseInt(dayData[0].slice(5, 7)) - 1].slice(0, 3) + ' ' + dayData[0].slice(8, 10);
    elemLocationDay.appendChild(elemLocationDayHeader);
    let elemLocationDayEntries = document.createElement('div');
    elemLocationDayEntries.classList.add('location-data-entries');
    elemLocationDay.appendChild(elemLocationDayEntries);
    for (let k = 0; k < 4; k++){
      let elemLocationDayEntry = document.createElement('div');
      elemLocationDayEntry.classList.add('location-data-entry');
      let periodData = dayData[1][k];
      let elemLocationDayPeriod = document.createElement('img');
      elemLocationDayPeriod.src = PERIODS_ICONS[k];
      let elemLocationDayValue = document.createElement('span');
      elemLocationDayValue.classList.add('value');
      colorTemperature(elemLocationDayValue, periodData[0]);
      if (periodData[0] > 0){
        elemLocationDayValue.textContent = '+' + periodData[0] + '°';
      } 
      else{
        elemLocationDayValue.textContent = periodData[0] + '°';
      }
      elemLocationDayEntry.appendChild(elemLocationDayPeriod);
      elemLocationDayEntry.appendChild(elemLocationDayValue);
      elemLocationDayEntries.appendChild(elemLocationDayEntry);
    }
    list.appendChild(elemLocationDay);
  }
}

let locations = [
]
let elemLocationsList = document.getElementsByClassName('location-data');

if (localStorage.getItem('locations')){
  locations = JSON.parse(localStorage.getItem('locations'));
}

async function setupPage(){
  for (let location of locations){
    location.data = await getWeather(location.latitude, location.longitude);
  }
  populateElemLocations()

  localStorage.setItem('locations', JSON.stringify(locations));
}

setupPage();

async function addCurrentLocation(latitude, longitude){
  let entry = {latitude: latitude, longitude: longitude, data: '', place: 'Current location'};
  entry.data = await getWeather(entry.latitude, entry.longitude);
  if (curr_location != entry){
    curr_location = entry;
    populateCurrentLocation();
  }
}

const elemCurrLocations = document.getElementsByClassName('location-data');
const watchID = navigator.geolocation.watchPosition((position) => {
  if (curr_location == ''){
    curr_target = document.getElementsByClassName('current-location__geolocation')[0];
    curr_loc_geo.classList.remove('hidden');
    addCurrentLocation(position.coords.latitude, position.coords.longitude);
    curr_loc_man_ch.classList.add('hidden');
    curr_loc_man.classList.add('hidden');
  }
},
() => {
    curr_loc_geo.classList.add('hidden');
    curr_loc_man_ch.classList.remove('hidden');
    curr_loc_man.classList.add('hidden');
  }

);

const refresh_btn = document.getElementById('refresh-btn');
refresh_btn.addEventListener('click', () =>{
  refreshWeatherData();
})


const main = document.getElementsByTagName('main')[0];


function populateCitiesLists(){
  let citiesLists = document.getElementsByClassName('datalist-cities');
  for (let list of citiesLists){
    list.textContent = '';
    for (let [place, coords] of Object.entries(MAP_LOCATIONS)){
      let elemPlace = document.createElement('option');
      elemPlace.value = place;
      list.appendChild(elemPlace);
    }
  }
}

function populateCountriesLists(){
  let countriesLists = document.getElementsByClassName('datalist-countries');
  for (let list of countriesLists){
    for (let [place, id] of Object.entries(MAP_COUNTRIES)){
      let elemPlace = document.createElement('option');
      elemPlace.value = place;
      list.appendChild(elemPlace);
    }
  }
}

let add_current_btns = document.getElementsByClassName('add-current-btn');
for (let btn of add_current_btns){
  let add_select = btn.parentNode.getElementsByTagName('input')[0];
  add_select.value = "";
  btn.addEventListener('click', () => {
    curr_target = document.getElementsByClassName('current-location__manual')[0];
    addCurrentLocation(MAP_LOCATIONS[add_select.value][0], MAP_LOCATIONS[add_select.value][1]);
    curr_loc_man_ch.classList.add('hidden');
    curr_loc_man.classList.remove('hidden');
  });
}

let add_city_btns = document.getElementsByClassName('add-city-btn');
for (let btn of add_city_btns){
  let add_select = btn.parentNode.getElementsByTagName('input')[0];
  btn.addEventListener('click', () => {createLocationEntry(add_select.value)});
}

let set_country_btns = document.getElementsByClassName('set-country-btn');
for (let btn of set_country_btns){
  let country_select = btn.parentNode.getElementsByTagName('input')[0];
  country_select.value = "";
  btn.addEventListener('click', () => {
    console.log(country_select.value, country_select.value in MAP_COUNTRIES.keys());
    if (country_select.value in MAP_COUNTRIES){
      populate(MAP_COUNTRIES[country_select.value])}
    }
  );
}

let MAP_COUNTRIES = [];
async function getCountries(){
  const requestURL =
    "https://plida.github.io/cities-info/countries.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const cities = await response.json();
  
  for (let country of cities){
    MAP_COUNTRIES[country.name] = country.id;
  }

  populateCountriesLists();

  console.log(cities.length);
}
async function populate(country_id) {
  console.log("?");
  const requestURL =
    "https://plida.github.io/cities-info/cities.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const cities = await response.json();
  MAP_LOCATIONS = {};
  for (let city of cities){
    if (city.country_id == country_id){
      MAP_LOCATIONS[city.name] = [city.latitude, city.longitude];
    }
  }

  populateCitiesLists();

  console.log(cities.length);
}

getCountries();