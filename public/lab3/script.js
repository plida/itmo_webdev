// VARIABLES
let gameBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
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

// FUNCTIONS

function moveBoard(direction){
  direction = direction.toLowerCase();
  switch (direction){
    case 'up':
      moveBoardUp();
      break;
    case 'right':
      moveBoardRight();
      break;
    case 'down':
      moveBoardDown();
      break;
    case 'left':
      moveBoardLeft();
      break;
  }
  addNewRandomTile();
  updateBoardVisual();
}

const combineTile = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(0) scale(1.25)" },
  { transform: "rotate(0) scale(1)" },
];

const combineTileTiming = {
  duration: 200,
  iterations: 1,
};

function moveBoardUp(){
  let visualTiles = board.querySelectorAll('.gameboard__tile');
  for (let i = 0; i < 3; i++){
    console.log(i);
    for (let j = 0; j < 4; j++){
      if (gameBoard[i][j] != 0){
        for (let k = i + 1; k < 4; k++){
          if (gameBoard[k][j] == gameBoard[i][j]){
            console.log(i, j, k, "|", gameBoard[k][j], gameBoard[i][j]);
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[k][j] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      else{
        for (let k = i + 1; k < 4; k++){
          if (gameBoard[k][j] != 0){
            gameBoard[i][j] = gameBoard[k][j];
            gameBoard[k][j] = 0;
            break
          }
        }
        if (gameBoard[i][j] != 0){
        for (let k = i + 1; k < 4; k++){
          if (gameBoard[k][j] == gameBoard[i][j]){
            console.log(i, j, k, "|", gameBoard[k][j], gameBoard[i][j]);
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[k][j] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      }
    }
  }
}
function moveBoardRight(){
  let visualTiles = board.querySelectorAll('.gameboard__tile');
  for (let i = 0; i < 4; i++){
    for (let j = 3; j > 0; j--){
      if (gameBoard[i][j] != 0){
        for (let k = j - 1; k >= 0; k--){
          if (gameBoard[i][k] == gameBoard[i][j]){
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[i][k] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      else{
        for (let k = j - 1; k >= 0; k--){
          if (gameBoard[i][k] != 0){
            gameBoard[i][j] = gameBoard[i][k];
            gameBoard[i][k] = 0;
            break
          }
        }
        if (gameBoard[i][j] != 0){
        for (let k = j - 1; k >= 0; k--){
          if (gameBoard[i][k] == gameBoard[i][j]){
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[i][k] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      }
    }
  }
}
function moveBoardDown(){
  let visualTiles = board.querySelectorAll('.gameboard__tile');
  for (let i = 3; i > 0; i--){
    for (let j = 0; j < 4; j++){
      if (gameBoard[i][j] != 0){
        for (let k = i - 1; k >= 0; k--){
          if (gameBoard[k][j] == gameBoard[i][j]){
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[k][j] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      else{
        for (let k = i - 1; k >= 0; k--){
          if (gameBoard[k][j] != 0){
            gameBoard[i][j] = gameBoard[k][j];
            gameBoard[k][j] = 0;
            break
          }
        }
        if (gameBoard[i][j] != 0){
        for (let k = i - 1; k >= 0; k--){
          if (gameBoard[k][j] == gameBoard[i][j]){
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[k][j] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      }
    }
  }
}
function moveBoardLeft(){
  let visualTiles = board.querySelectorAll('.gameboard__tile');
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 3; j++){
      if (gameBoard[i][j] != 0){
        for (let k = j + 1; k < 4; k++){
          if (gameBoard[i][k] == gameBoard[i][j]){
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[i][k] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      else{
        for (let k = j + 1; k < 4; k++){
          if (gameBoard[i][k] != 0){
            gameBoard[i][j] = gameBoard[i][k];
            gameBoard[i][k] = 0;
            break
          }
        }
        if (gameBoard[i][j] != 0){
        for (let k = j + 1; k < 4; k++){
          if (gameBoard[i][k] == gameBoard[i][j]){
            gameBoard[i][j] = gameBoard[i][j] * 2;
            visualTiles[i*4 + j].animate(combineTile, combineTileTiming)
            gameBoard[i][k] = 0;
            break
          }
          else if (gameBoard[k][j] != 0){
            break
          }
        }
      }
      }
    }
  }
}


function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}


function getRandomInteger(max){
  return Math.floor(Math.random() * max)
}
const newTileAppear = [
  { transform: "rotate(0) scale(0)" },
  { transform: "rotate(0) scale(1)" },
];

const newTileTiming = {
  duration: 200,
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
  let visualTiles = board.querySelectorAll('.gameboard__tile');
  visualTiles[newTileCoords[0]*4 + newTileCoords[1]].animate(newTileAppear, newTileTiming);
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
    [0, 2, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 4]
  ]
  //color testing
  /*gameBoard = [
    [0, 2, 4, 8],
    [16, 32, 64, 128],
    [256, 512, 1024, 2048],
    [16384, 131072, 1048576, 1073741824]
  ]*/
  /*for (let i = 0; i < getRandomInteger(3) + 1; i++){
    console.log(getFreeTiles().length);
    addNewRandomTile();
  }*/
  updateBoardVisual();
}

function updateBoardVisual(){
  let visualTiles = board.querySelectorAll('.gameboard__tile');
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
      let chosenTile = visualTiles[i*4 + j];
      let tileValue = gameBoard[i][j];
      chosenTile.setAttribute('tile-value', tileValue);
      if (tileValue != 0){
        chosenTile.textContent = tileValue;
      }
      else{
        chosenTile.textContent = '';
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

const controls = document.createElement('section');
controls.classList.add('controls');
main_container.appendChild(controls);
const controls_left = document.createElement('button');
controls_left.classList.add('controls__arrow');
controls_left.classList.add('controls__arrow-left');
controls_left.addEventListener('click', () => {moveBoard('left')});
controls.appendChild(controls_left);
const controls_right = document.createElement('button');
controls_right.classList.add('controls__arrow');
controls_right.classList.add('controls__arrow-right');
controls_right.addEventListener('click', () => {moveBoard('right')});
controls.appendChild(controls_right);
const controls_down = document.createElement('button');
controls_down.classList.add('controls__arrow');
controls_down.classList.add('controls__arrow-down');
controls_down.addEventListener('click', () => {moveBoard('down')});
controls.appendChild(controls_down);
const controls_up = document.createElement('button');
controls_up.classList.add('controls__arrow');
controls_up.classList.add('controls__arrow-up');
controls_up.addEventListener('click', () => {moveBoard('up')});
controls.appendChild(controls_up);

document.addEventListener("keydown", (e) => {
  if (e.code.indexOf('Arrow') == 0){
    moveBoard(e.code.slice(5));
  }
})

let x = window.matchMedia("(max-width: 512px)")
x.addEventListener("change", function() {
  changeTileFont(x);
}); 

if (localStorage.getItem('tasklist-test')){
}

changeTileFont(x);
startNewGame();