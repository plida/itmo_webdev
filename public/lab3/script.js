// VARIABLES
let gameBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
let prevGameBoard = [

]
let gameScore = 0;
let tileFont = 0;
let tileFontRate = 0;
let maxTileValue = 2048;
let tileColors = [
  [237, 216, 190], 
  [237, 216, 190], 
  [240, 178, 111], 
  [237, 79, 65], 
  [173, 54, 39], 
  [115, 32, 15]
]

let prevMove = [];
let newlyAdded = [];
let isBoardPaused = false;
let baseSpeed = 100;
let animationSpeed = 100;

// FUNCTIONS

function updateScore(newAmount){
  gameScore = gameScore + newAmount;
  score.textContent = gameScore;
}

function updateBoardMove(direction){
  if (isBoardPaused){
    return;
  }
  isBoardPaused = true;
  speed_control_input.disabled = true;
  let movedTiles = [];
  movedTiles = collectMovedTiles(direction);
  prevMove = movedTiles;
  prevGameBoard = gameBoard;
  console.log(prevGameBoard, gameBoard);
  setTimeout(function(){
    updateBoardSnap(movedTiles);
  }, animationSpeed)
}

function updateBoardSnap(movedTiles){
  
  let animations = [];
  for (tile of movedTiles){
    let oldTile = gameBoard[tile[0][0]][tile[0][1]];
    let newTile = gameBoard[tile[1][0]][tile[1][1]];
    if (oldTile != newTile){
      let shift = tile[2];
      let animation = animateTile('moved', visualTiles[tile[0][0]*4 + tile[0][1]], shift)
      animations.push(animation);
    }
    else{
      let shift = tile[2];
      let animation = animateTile('moved', visualTiles[tile[0][0]*4 + tile[0][1]], shift)
      animations.push(animation);
    }
  }
  //updateBoardVisual();

  setTimeout(function(){
    for (let animation of animations){
      animation.cancel();
    }
    for (tile of movedTiles){
      let oldTile = gameBoard[tile[0][0]][tile[0][1]];
      let newTile = gameBoard[tile[1][0]][tile[1][1]];
      if (oldTile != newTile){
        gameBoard[tile[0][0]][tile[0][1]] = 0;
        gameBoard[tile[1][0]][tile[1][1]] = oldTile;
      }
      else{
        gameBoard[tile[0][0]][tile[0][1]] = 0;
        gameBoard[tile[1][0]][tile[1][1]] = oldTile * 2;
        updateScore(oldTile * 2);
        animateTile('combined', visualTiles[tile[1][0]*4 + tile[1][1]]);
      }
    }
    updateBoardVisual();
    updateBoardAdd();
  }, animationSpeed)
}

function updateBoardAdd(){
  addNewRandomTile();
  isBoardPaused = false;
  speed_control_input.disabled = false;
  setTimeout(function(){
    updateBoardVisual();
  }, animationSpeed)
}

function undoMove(){
  if (prevMove == []){
    return;
  }
  animations = [];
  for (tile of newlyAdded){
    gameBoard[tile[0]][tile[1]] = 0;
  }
  console.log(prevGameBoard);
  for (tile of prevMove){
    let oldTile = prevGameBoard[tile[0][0]][tile[0][1]];
    let newTile = prevGameBoard[tile[1][0]][tile[1][1]];
    console.log(oldTile, newTile, tile);
  }
  updateBoardVisual();
  /*for (let tile of prevMove){
    let oldTile = gameBoard[tile[0][0]][tile[0][1]];
    let newTile = gameBoard[tile[1][0]][tile[1][1]];
    if (oldTile != newTile){
      let shift = tile[2];
      let animation = animateTile('moved', visualTiles[tile[0][0]*4 + tile[0][1]], shift)
      animations.push(animation);
    }
    else{
      let shift = tile[2];
      let animation = animateTile('moved', visualTiles[tile[0][0]*4 + tile[0][1]], shift)
      animations.push(animation);
    }
  }
  updateBoardVisual();
  prevMove = [];
  setTimeout(function(){
  for (let animation of animations){
      animation.cancel();
    }})*/
  newlyAdded = [];
  prevGameBoard = [];
}

function animateTile(type, tile, shift='0%, 0%'){
  let animation = '';
  switch (type){
    case 'appeared':
      animation = tile.animate(
      [
        { transform: 'scale(0)' },
        { transform: 'scale(1)' },
      ], 
      {
        duration: animationSpeed,
        iterations: 1,
        delay: animationSpeed,
      });
    break;
    case 'combined':
      animation = tile.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.25)' },
        { transform: 'scale(1)' },
      ], 
      {
        duration: animationSpeed,
        iterations: 1,
      });
      break;
    case 'moved':
      animation = tile.animate([
        {transform: 'translate(0)'},
        {transform: 'translate(' + shift + ')'},
      ], 
      {
        duration: animationSpeed,
        iterations: 1,
        fill: 'forwards'
      });
      break;
    case 'stopped':
      animation = tile.animate([
        {transform: 'translate(0)'},
      ], 
      {
        duration: animationSpeed,
        iterations: 1,
        fill: 'forwards'
      });
      break;
    case 'movedreverse':
      animation = tile.animate([
        {transform: 'translate(' + shift + ')'},
        {transform: 'translate(0)'},
      ], 
      {
        duration: animationSpeed,
        iterations: 1,
      });
      
      break;
  }
  return animation;
}

function collectMovedTiles(direction){
  let movedTiles = [];
  direction = direction.toLowerCase();
  switch (direction){
    case 'up':
      movedTiles = moveBoardUp();
      break;
    case 'right':
      movedTiles = moveBoardRight();
      break;
    case 'down':
      movedTiles = moveBoardDown();
      break;
    case 'left':
      movedTiles = moveBoardLeft();
      break;
  }
  return movedTiles;
}

function moveTileList(tiles){
  let movedTiles = [];
  let gameBoardWidth = document.getElementsByClassName('gameboard')[0].offsetWidth;
  let tileWidth = document.getElementsByClassName('gameboard__tile')[0].offsetWidth;
  let ratio = (gameBoardWidth / tileWidth - 4) / 10;
  for (let k = 0; k < 4; k++){
    if (tiles[k] == 0){
      for (let l = k + 1; l < 4; l++){
        if (tiles[l] != 0){
          tiles[k] = tiles[l];
          tiles[l] = 0;
          movedTiles.push([l, k,  (l-k + (ratio * 2 * (l-k)))]);
          break;
        }
      }
    }

    if (tiles[k] != 0){
      for (let l = k + 1; l < 4; l++){
        if (tiles[l] == 0){
          continue;
        }
        if (tiles[l] == tiles[k]){
          tiles[k] = tiles[l] * 2;
          tiles[l] = 0;
          movedTiles.push([l, k, (l-k + (ratio * 2 * (l-k)))]);
        }
        break;
      }
    }
  }
  return movedTiles;
}

function moveBoardUp(){
  let movedTiles = [];
  for (let j = 0; j < 4; j++){
    let column = [];
    for (let k = 0; k < 4; k++){
      column.push(gameBoard[k][j]);
    }
    let movedColumnTiles = moveTileList(column);
    if (movedColumnTiles.length > 0){
      for (let k = 0; k < movedColumnTiles.length; k++){
        movedTiles.push([[movedColumnTiles[k][0], j], [movedColumnTiles[k][1], j], '0%, ' + (-movedColumnTiles[k][2]) * 100 + '%']);
      }
    }
  }
  return movedTiles;
}

function moveBoardDown(){
  let movedTiles = [];
  for (let j = 0; j < 4; j++){
    let column = [];
    for (let k = 3; k >= 0; k--){
      column.push(gameBoard[k][j]);
    }
    let movedColumnTiles = moveTileList(column);
    if (movedColumnTiles.length > 0){
      for (let k = 0; k < movedColumnTiles.length; k++){
        movedTiles.push([[3 - movedColumnTiles[k][0], j], [3 - movedColumnTiles[k][1], j], '0%, ' + (movedColumnTiles[k][2]) * 100 + '%']);
      }
    }
  }
  return movedTiles;
}

function moveBoardRight(){
  let movedTiles = [];
  for (let i = 0; i < 4; i++){
    let column = [];
    for (let k = 3; k >= 0; k--){
      column.push(gameBoard[i][k]);
    }
    let movedColumnTiles = moveTileList(column);
    if (movedColumnTiles.length > 0){
      for (let k = 0; k < movedColumnTiles.length; k++){
        movedTiles.push([[i, 3 - movedColumnTiles[k][0]], [i, 3 - movedColumnTiles[k][1]], (movedColumnTiles[k][2]) * 100 + '%, 0%']);
      }
    }
  }
  return movedTiles;
}

function moveBoardLeft(){
  let movedTiles = [];
  for (let i = 0; i < 4; i++){
    let column = [];
    for (let k = 0; k < 4; k++){
      column.push(gameBoard[i][k]);
    }
    let movedColumnTiles = moveTileList(column);
    if (movedColumnTiles.length > 0){
      for (let k = 0; k < movedColumnTiles.length; k++){
        movedTiles.push([[i, movedColumnTiles[k][0]], [i, movedColumnTiles[k][1]], (- movedColumnTiles[k][2]) * 100 + '%, 0%']);
      }
    }
  }
  return movedTiles;
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function getRandomInteger(max){
  return Math.floor(Math.random() * max)
}
const newTileAppear = [
  { transform: 'rotate(0) scale(0)' },
  { transform: 'rotate(0) scale(1)' },
];

const newTileTiming = {
  duration: animationSpeed,
  iterations: 1,
};

function addNewRandomTile(){
  let freeTiles = getFreeTiles();
  if (freeTiles.length == 0){
    alert('the game is over!');
    startNewGame();
    return;
  }
  let randomRow = freeTiles[getRandomInteger(freeTiles.length)];
  let newTileCoords = randomRow[getRandomInteger(randomRow.length)];
  let tileValue = (getRandomInteger(2) + 1) * 2;
  gameBoard[newTileCoords[0]][newTileCoords[1]] = tileValue;
  animateTile('appeared', visualTiles[newTileCoords[0]*4 + newTileCoords[1]]);
  newlyAdded.push([newTileCoords[0], newTileCoords[1]]);
}

function getFreeTiles(){
  let freeTiles = [];
  for (let i = 0; i < 4; i++){
    let row = [];
    for (let j = 0; j < 4; j++){
      if (gameBoard[i][j] == 0){
        row.push([i, j]);
      }
    }
    if (row.length > 0){
      freeTiles.push(row);
    }
  }
  return freeTiles;
}

function startNewGame(){
  gameBoard = [
    [4, 0, 0, 0],
    [4, 2, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 2]
  ]
  gameScore = 0;
  updateScore(0);
  /*
  for (let i = 0; i < getRandomInteger(3) + 1; i++){
    addNewRandomTile();
  }*/
  updateBoardVisual();
}

function updateBoardVisual(){
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
      let chosenTile = visualTiles[i*4 + j];
      let tileValue = gameBoard[i][j];
      chosenTile.setAttribute('tile-value', tileValue);
      if (tileValue != 0){
        chosenTile.textContent = tileValue;
        chosenTile.classList.add('active-tile');
      }
      else{
        chosenTile.textContent = '';
        chosenTile.classList.remove('active-tile');
      }
      let tileVisual = Math.max(1, tileFont - tileFontRate * tileValue.toString().length);
      chosenTile.style.fontSize = tileVisual.toString() + 'rem';
      changeTileColor(chosenTile);
    }
  }
}

function changeTileFont(x){
  if (x.matches){
    if (tileFont != 2){
      tileFont = 2;
      tileFontRate = 0.25;
      updateBoardVisual();
    }
  }
  else{
    if (tileFont != 2.25){
      tileFont = 2.25;
      tileFontRate = 0.125;
      updateBoardVisual();
    }
  }
}

function pickHex(color1, color2, weight) {
  var w2 = weight;
  var w1 = 1 - w2;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function changeTileColor(tile){
  let tileValue = tile.getAttribute('tile-value');
  if (tileValue == 0){
    tile.style.background = '';
    return;
  }
  let tileValuePercent = Math.min(1, getBaseLog(2, tileValue) / getBaseLog(2, maxTileValue));
  let gradientEdge = Math.round(tileValuePercent * 100 / 25);
  let firstColor = tileColors[gradientEdge];
  let secondColor = tileColors[Math.min(gradientEdge + 1, tileColors.length - 1)];
  let weight = (tileValuePercent * 100 / 25 - (Math.min(gradientEdge) - 1));
  let color = pickHex(firstColor, secondColor, weight);
  tile.style.background = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';
}

// PAGE SETUP
const page = document.body;
const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');
page.appendChild(header);
page.appendChild(main);
page.appendChild(footer);


const header_nav = document.createElement('nav');
header.appendChild(header_nav);
const header_nav_list = document.createElement('ul');
header_nav.appendChild(header_nav_list);

const header_logo = document.createElement('li');
header_nav_list.appendChild(header_logo);
const header_logo_link = document.createElement('a');
header_logo_link.href = 'index.html';
header_logo_link.classList.add('disabled');
header_logo.appendChild(header_logo_link);
const header_logo_image = document.createElement('img');
header_logo_image.src = 'media/4502.png';
header_logo_link.appendChild(header_logo_image);
const header_logo_long = document.createElement('h1');
header_logo_long.textContent = "Plida's cool 2048 game \r\nWeb programming lab work #3"
header_logo_long.classList.add('site-name-long');
header_logo_link.appendChild(header_logo_long);
const header_logo_middle = document.createElement('h1');
header_logo_middle.textContent = "Plida's cool 2048 game"
header_logo_middle.classList.add('site-name-middle');
header_logo_link.appendChild(header_logo_middle);
const header_logo_short = document.createElement('h1');
header_logo_short.textContent = ""
header_logo_short.classList.add('site-name-short');
header_logo_link.appendChild(header_logo_short);

const header_git = document.createElement('li');
header_nav_list.appendChild(header_git);
const header_git_link = document.createElement('a');
header_git_link.href = 'https://github.com/plida/itmo_webdev/tree/main/public/lab3';
header_git.appendChild(header_git_link);
const header_git_image = document.createElement('img');
header_git_image.src = 'media/Octicons-mark-github.svg.png';
header_git_link.appendChild(header_git_image);


const footer_text = document.createElement('span');
footer_text.textContent = 'Plida 2025';
footer.appendChild(footer_text);

// MAIN
const main_container = document.createElement('div');
main_container.classList.add('main-container');
main.appendChild(main_container);

const speed_control = document.createElement('section');
speed_control.classList.add('speed-control');
main_container.appendChild(speed_control);
const speed_control_slider = document.createElement('div');
speed_control.appendChild(speed_control_slider);

const speed_control_label = document.createElement('label');
speed_control_label.textContent = 'animation speed';
speed_control_label.for = 'speed-control';
speed_control_slider.appendChild(speed_control_label);

const markers = [10**(-1) * 3.3, 10**(-1) * 5, 1, 2, 3, 5, 10];

const speed_control_input = document.createElement('input');
speed_control_input.type = 'range';
speed_control_input.id = 'speed-control';
speed_control_input.value = 2;
speed_control_input.min = 0;
speed_control_input.max = markers.length - 1;
speed_control_input.step = 1;
speed_control_input.setAttribute('list', 'speed-markers');
speed_control_input.addEventListener('change', (event) => {
  if (isBoardPaused == false){
    animationSpeed = baseSpeed * (1 / markers[event.target.value]); 
    console.log(event.target.value, animationSpeed);
  }
});
speed_control_slider.appendChild(speed_control_input);

const speed_control_markers = document.createElement('datalist');


for (let i = 0; i < markers.length; i++){
  let speed_control_marker = document.createElement('option');
  speed_control_marker.value = i;
  speed_control_marker.label = markers[i];
  speed_control_markers.appendChild(speed_control_marker);
}
speed_control_markers.id = 'speed-markers';
main_container.appendChild(speed_control_markers);


const score = document.createElement('section');
score.textContent = '0';
main_container.appendChild(score);

const board = document.createElement('section');
board.classList.add('gameboard');
main_container.appendChild(board);
for (let i = 1; i < 17; i++){
  let board_tile_wrapper = document.createElement('div');
  board_tile_wrapper.classList.add('gameboard__tile-wrapper');
  board.appendChild(board_tile_wrapper);
  let board_tile = document.createElement('div');
  board_tile.classList.add('gameboard__tile');
  board_tile_wrapper.appendChild(board_tile);
}

const visualTiles = board.querySelectorAll('.gameboard__tile');

const settings = document.createElement('section');
main_container.appendChild(settings);
const undo = document.createElement('button');
undo.textContent = 'undo';
undo.addEventListener('click', () => {undoMove()});
settings.appendChild(undo);


const controls = document.createElement('section');
controls.classList.add('controls');
main_container.appendChild(controls);
const controls_left = document.createElement('button');
controls_left.classList.add('controls__arrow');
controls_left.classList.add('controls__arrow-left');
controls_left.addEventListener('click', () => {updateBoardMove('left')});
controls.appendChild(controls_left);
const controls_right = document.createElement('button');
controls_right.classList.add('controls__arrow');
controls_right.classList.add('controls__arrow-right');
controls_right.addEventListener('click', () => {updateBoardMove('right')});
controls.appendChild(controls_right);
const controls_down = document.createElement('button');
controls_down.classList.add('controls__arrow');
controls_down.classList.add('controls__arrow-down');
controls_down.addEventListener('click', () => {updateBoardMove('down')});
controls.appendChild(controls_down);
const controls_up = document.createElement('button');
controls_up.classList.add('controls__arrow');
controls_up.classList.add('controls__arrow-up');
controls_up.addEventListener('click', () => {updateBoardMove('up')});
controls.appendChild(controls_up);

document.addEventListener('keydown', (e) => {
  if (e.code.indexOf('Arrow') == 0){
    e.preventDefault();
    updateBoardMove(e.code.slice(5));
  }
})

let x = window.matchMedia('(max-width: 512px)')
x.addEventListener('change', function() {
  changeTileFont(x);
}); 

if (localStorage.getItem('tasklist-test')){
}

changeTileFont(x);
startNewGame();