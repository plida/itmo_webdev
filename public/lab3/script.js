// VARIABLES

// FUNCTIONS

function moveBoard(direction){
  direction = direction.toLowerCase();
  console.log(direction);
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
  let board_tile = document.createElement('div');
  board_tile.classList.add('gameboard__tile');
  board.appendChild(board_tile);
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



if (localStorage.getItem('tasklist-test')){
}
