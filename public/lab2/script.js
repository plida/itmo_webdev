const STATUSES = ['', 'incomplete', 'in progress', 'complete'];

let taskList = [
  { id: 0, name: '1', description: 'aaa', date: "2018-07-22", status: 1 },
  { id: 1, name: '2', description: 'bbb', date: "2019-07-22", status: 2 },
  { id: 2, name: '3', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 3, name: '4', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 4, name: '5', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 5, name: '6', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 6, name: '7', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 7, name: '8', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 8, name: '9', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 9, name: '10', description: 'ccc', date: "2020-07-22", status: 3 },
];

sorttype = "id";
nameFilter = "";
statusFilter = 1;

function compareID( a, b ) {
  if ( a.id > b.id ){
    return 1;
  }
  if ( a.id < b.id ){
    return -1;
  }
  return 0;
}

function compareIDInv( a, b ) {
  if ( a.id < b.id ){
    return 1;
  }
  if ( a.id > b.id ){
    return -1;
  }
  return 0;
}

function compareDate( a, b ) {
  if ( a.date < b.date ){
    return 1;
  }
  if ( a.date > b.date ){
    return -1;
  }
  return 0;
}

function compareDateInv( a, b ) {
  if ( a.date < b.date ){
    return -1;
  }
  if ( a.date > b.date ){
    return 1;
  }
  return 0;
}

function compareStatus( a, b ) {
  if ( a.status < b.status ){
    return 1;
  }
  if ( a.status > b.status ){
    return -1;
  }
  return 0;
}

function compareStatusInv( a, b ) {
  if ( a.status < b.status ){
    return -1;
  }
  if ( a.status > b.status ){
    return 1;
  }
  return 0;
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
header_logo_image.src = 'media/3.png';
header_logo_link.appendChild(header_logo_image);
const header_logo_long = document.createElement('h1');
header_logo_long.textContent = "Plida's cool To-Do list \r\nWeb programming lab work #2"
header_logo_long.classList.add('site-name-long');
header_logo_link.appendChild(header_logo_long);
const header_logo_middle = document.createElement('h1');
header_logo_middle.textContent = "Plida's cool To-Do list"
header_logo_middle.classList.add('site-name-middle');
header_logo_link.appendChild(header_logo_middle);

const header_git = document.createElement('li');
header_nav_list.appendChild(header_git);
const header_git_link = document.createElement('a');
header_git_link.href = 'https://github.com/plida/itmo_webdev/tree/main/public/lab2';
header_git.appendChild(header_git_link);
const header_git_image = document.createElement('img');
header_git_image.src = 'media/Octicons-mark-github.svg.png';
header_git_link.appendChild(header_git_image);


const footer_text = document.createElement('span');
footer_text.textContent = 'Plida 2025';
footer.appendChild(footer_text);

// MAIN
const task_window = document.createElement('section');
main.appendChild(task_window);

const task_window_search = document.createElement('section');
task_window.appendChild(task_window_search);
const task_window_search_input = document.createElement('input');
task_window_search.appendChild(task_window_search_input);

const task_window_sort = document.createElement('section');
task_window.appendChild(task_window_sort);
const task_window_sort_date = document.createElement('button');
task_window_sort_date.textContent = 'sort by date';
task_window_sort.appendChild(task_window_sort_date);
const task_window_sort_id = document.createElement('button');
task_window_sort_id.textContent = 'sort by ID';
task_window_sort.appendChild(task_window_sort_id);

const task_window_filter = document.createElement('section');
task_window.appendChild(task_window_filter);