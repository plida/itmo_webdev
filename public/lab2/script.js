// VARIABLES
const STATUSES = ['', 'new', 'in progress', 'done'];

let taskList = [
  { id: 0, name: '1', description: 'aaa', date: "2018-07-22", status: 1 },
  { id: 1, name: '2', description: 'bbb', date: "2019-07-22", status: 2 },
  { id: 2, name: '3', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 3, name: '4', description: 'ccc', date: "2020-07-22", status: 1 },
  { id: 4, name: '5', description: 'ccc', date: "2020-07-22", status: 2 },
  { id: 5, name: '6', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 6, name: '7', description: 'ccc', date: "2020-07-22", status: 1 },
  { id: 7, name: '8', description: 'ccc', date: "2020-07-22", status: 2 },
  { id: 8, name: '9', description: 'ccc', date: "2020-07-22", status: 3 },
  { id: 9, name: '10', description: 'ccc', date: "2020-07-22", status: 1 },
];

sorttype = "id";
nameFilter = "";
statusFilter = 1;




// SORTING
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




// TASKS
function updateTasks(){
  localStorage.setItem('tasklist-test', JSON.stringify(taskList)); 
  listTasks();
}


function getSortedTaskList(sorttype){
  let sortedTaskList = structuredClone(taskList);
  switch (sorttype){
    case "date":
      sortedTaskList = sortedTaskList.sort(compareDate);
      break;
    case "dateinv":
      sortedTaskList = sortedTaskList.sort(compareDateInv);
      break;
    case "id":
      sortedTaskList = sortedTaskList.sort(compareID);
      break;
    case "idinv":
      sortedTaskList = sortedTaskList.sort(compareIDInv);
      break;
    default:
      sortedTaskList = sortedTaskList.sort(compareID);
  }
  return sortedTaskList;
}


function listTasks(){
  let listUL = task_window.querySelector('ul');
  let listUL_clone = listUL.cloneNode();
  listUL_clone.textContent = '';
  task_window.appendChild(listUL_clone);
  listUL.remove();
  let sortedTaskList = getSortedTaskList(sorttype);

  for (task of sortedTaskList){
    if (task.name.toUpperCase().indexOf(nameFilter) === -1) {
      continue;
    }
    if (statusFilter > 0 && task.status != statusFilter){
      continue;
    }

    let taskElem = document.createElement('li');
    taskElem.setAttribute('index', task.id)
    setTaskDOM(task, taskElem);
    setTaskListeners(task, taskElem);
    listUL_clone.appendChild(taskElem);
  }
}


function addTask(){
  let data = new FormData(task_form);
  let highestID = 0;
  if (taskList.length > 0){
    let sortedTaskList = getSortedTaskList('idinv');
    highestID = sortedTaskList[0].id;
  }
  taskList.push(
    {
      id: highestID + 1,
      name: data.get('name'), 
      description: data.get('description'),
      date: data.get('date'),
      status: 1
    }
  )
  updateTasks();
}


function removeTask(id){
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined){
    return;
  } 
  let n = taskList.indexOf(item);
  taskList.splice(n, 1);
  updateTasks();
}


function updateTask(id, event){
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined){
    return;
  }
  const data = new FormData(event.target);
  if (data.get('name') != ''){
    item.name = data.get('name');
  }
  if (data.get('description') != ''){
    item.description = data.get('description');
  }
  if (data.get('date') != ''){
    item.date = data.get('date');
  }
  updateTasks();
}


function changeTaskStatus(id, newStatus){
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined){
    return;
  } 
  item.status = newStatus;
  updateTasks();
}

let dragStartID;
function dragStart() {
  dragStartID = +this.closest('li').getAttribute('index');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndID = +this.getAttribute('index');
  swapItems(dragStartID, dragEndID);
  this.classList.remove('over');
}
function swapItems(fromID, toID) {
  let item1 = taskList.find(item => item.id === parseInt(fromID));
  let item2 = taskList.find(item => item.id === parseInt(toID));
  if (item1 != undefined && item2 != undefined){
    let n1 = taskList.indexOf(item1);
    let n2 = taskList.indexOf(item2);
    taskList[n1].id = toID;
    taskList[n2].id = fromID;
  } 
  updateTasks();
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
const main_container = document.createElement('div');
main_container.classList.add('main-container');
main.appendChild(main_container);

const task_window = document.createElement('section');
task_window.classList.add('task-window');
main_container.appendChild(task_window);

const task_settings = document.createElement('section');
task_settings.classList.add('task-settings');
task_window.appendChild(task_settings);


const task_settings_left = document.createElement('div');
task_settings_left.classList.add('task-settings__left');
task_settings.appendChild(task_settings_left);
const task_search = document.createElement('section');
task_search.classList.add('task-settings__search');
task_settings_left.appendChild(task_search);
const task_search_label = document.createElement('div');
task_search_label.classList.add('task-settings__search-icon');
task_search.appendChild(task_search_label);
const task_search_img = document.createElement('img');
task_search_img.src = 'media/Magnifying_glass_icon.svg.png';
task_search_label.appendChild(task_search_img);
const task_search_input = document.createElement('input');
task_search_input.addEventListener('keyup', (event) => {nameFilter = event.target.value; listTasks()})
task_search.appendChild(task_search_input);


const task_sort = document.createElement('section');
task_sort.classList.add('task-settings__sort');
task_settings_left.appendChild(task_sort);
const task_sort_date = document.createElement('button');
task_sort_date.textContent = 'sort by date';
task_sort_date.addEventListener('click', () => {
  if (sorttype === "date"){sorttype = "dateinv";}
  else{sorttype = "date";}
  listTasks();
})
task_sort.appendChild(task_sort_date);
const task_sort_id = document.createElement('button');
task_sort_id.textContent = 'sort by ID';
task_sort_id.addEventListener('click', () => {
  if (sorttype === "id"){sorttype = "idinv";}
  else{sorttype = "id";}
  listTasks();
})
task_sort.appendChild(task_sort_id);

const task_filter = document.createElement('fieldset');
task_filter.classList.add('task-settings__filter');
task_settings.appendChild(task_filter);

const task_filter_legend = document.createElement('div');
task_filter_legend.classList.add('task-settings__filter-legend');
task_filter.appendChild(task_filter_legend);
const task_filter_legend_text = document.createElement('span');
task_filter_legend_text.textContent = 'filter by status';
task_filter_legend.appendChild(task_filter_legend_text);

let task_filter_buttons = document.createElement('section');
task_filter_buttons.classList.add('task-settings__filter-buttons');
task_filter.appendChild(task_filter_buttons)


const task_filter_new = document.createElement('div');
task_filter_buttons.appendChild(task_filter_new);
const task_filter_new_input = document.createElement('input');
task_filter_new_input.type = 'radio';
task_filter_new_input.name = 'task-filter-status';
task_filter_new_input.id = 'task-filter-status__new';
task_filter_new_input.value = 1;
task_filter_new_input.checked = 'checked';
task_filter_new.appendChild(task_filter_new_input);
const task_filter_new_label = document.createElement('label');
task_filter_new_label.for = 'task-filter-status__new';
task_filter_new_label.textContent = 'new';
task_filter_new.appendChild(task_filter_new_label);

const task_filter_inprogress = document.createElement('div');
task_filter_buttons.appendChild(task_filter_inprogress);
const task_filter_inprogress_input = document.createElement('input');
task_filter_inprogress_input.type = 'radio';
task_filter_inprogress_input.name = 'task-filter-status';
task_filter_inprogress_input.id = 'task-filter-status__inprogress';
task_filter_inprogress_input.value = 2;
task_filter_inprogress.appendChild(task_filter_inprogress_input);
const task_filter_inprogress_label = document.createElement('label');
task_filter_inprogress_label.for = 'task-filter-status__inprogress';
task_filter_inprogress_label.textContent = 'in progress';
task_filter_inprogress.appendChild(task_filter_inprogress_label);

const task_filter_done = document.createElement('div');
task_filter_buttons.appendChild(task_filter_done);
const task_filter_done_input = document.createElement('input');
task_filter_done_input.type = 'radio';
task_filter_done_input.name = 'task-filter-status';
task_filter_done_input.id = 'task-filter-status__done';
task_filter_done_input.value = 3;
task_filter_done.appendChild(task_filter_done_input);
const task_filter_done_label = document.createElement('label');
task_filter_done_label.for = 'task-filter-status__done';
task_filter_done_label.textContent = 'done';
task_filter_done.appendChild(task_filter_done_label);

const task_filter_all = document.createElement('div');
task_filter_buttons.appendChild(task_filter_all);
const task_filter_all_input = document.createElement('input');
task_filter_all_input.type = 'radio';
task_filter_all_input.name = 'task-filter-status';
task_filter_all_input.id = 'task-filter-status__all';
task_filter_all_input.value = 0;
task_filter_all.appendChild(task_filter_all_input);
const task_filter_all_label = document.createElement('label');
task_filter_all_label.for = 'task-filter-status__all';
task_filter_all_label.textContent = 'all';
task_filter_all.appendChild(task_filter_all_label);

task_filter.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', (event) => {statusFilter = event.target.value; listTasks()});
});

const task_list = document.createElement('ul');
task_window.appendChild(task_list);


function setTaskDOM(task, taskElem){
  let task_name = document.createElement('span');
  task_name.textContent = task.name;
  taskElem.appendChild(task_name);
  let task_description = document.createElement('p');
  task_description.textContent = task.description;
  taskElem.appendChild(task_description);
  let task_date = document.createElement('span');
  task_date.textContent = task.date;
  taskElem.appendChild(task_date);

  let task_edit = document.createElement('button');
  task_edit.classList.add('task__edit-btn');
  task_edit.id = 'task_edit-btn' + task.id;
  taskElem.appendChild(task_edit);


  let task_status_form = document.createElement('form');
  taskElem.appendChild(task_status_form);
  let task_status_fieldset = document.createElement('fieldset');
  task_status_form.appendChild(task_status_fieldset);

  let task_status_legend = document.createElement('legend');
  task_status_legend.textContent = 'status';
  task_status_fieldset.appendChild(task_status_legend);

  let task_status_new = document.createElement('div');
  task_status_fieldset.appendChild(task_status_new);
  let task_status_new_input = document.createElement('input');
  task_status_new_input.type = 'radio';
  task_status_new_input.name = 'task-status';
  task_status_new_input.id = 'task-status__new';
  task_status_new_input.value = 1;
  task_status_new_input.checked = 'checked';
  task_status_new.appendChild(task_status_new_input);
  let task_status_new_label = document.createElement('label');
  task_status_new_label.for = 'task-status__new';
  task_status_new_label.textContent = 'new';
  task_status_new.appendChild(task_status_new_label);

  let task_status_inprogress = document.createElement('div');
  task_status_fieldset.appendChild(task_status_inprogress);
  let task_status_inprogress_input = document.createElement('input');
  task_status_inprogress_input.type = 'radio';
  task_status_inprogress_input.name = 'task-status';
  task_status_inprogress_input.id = 'task-status__inprogress';
  task_status_inprogress_input.value = 2;
  task_status_inprogress.appendChild(task_status_inprogress_input);
  let task_status_inprogress_label = document.createElement('label');
  task_status_inprogress_label.for = 'task-status__inprogress';
  task_status_inprogress_label.textContent = 'in progress';
  task_status_inprogress.appendChild(task_status_inprogress_label);

  let task_status_done = document.createElement('div');
  task_status_fieldset.appendChild(task_status_done);
  let task_status_done_input = document.createElement('input');
  task_status_done_input.type = 'radio';
  task_status_done_input.name = 'task-status';
  task_status_done_input.id = 'task-status__done';
  task_status_done_input.value = 3;
  task_status_done.appendChild(task_status_done_input);
  let task_status_done_label = document.createElement('label');
  task_status_done_label.for = 'task-status__done';
  task_status_done_label.textContent = 'done';
  task_status_done.appendChild(task_status_done_label);

  switch (task.status){
    case 1:
      task_status_new_input.checked = 'checked';
      break;
    case 2:
      task_status_inprogress_input.checked = 'checked';
      break;
    case 3:
      task_status_done_input.checked = 'checked';
      break;
  }

  let task_remove = document.createElement('button');
  task_remove.classList.add('task__remove-btn');
  task_remove.id = 'task_remove-btn' + task.id;
  taskElem.appendChild(task_remove);
}

function createEditForm(id, taskElem){
  let edit_form = document.createElement('form');
  edit_form.id = 'edit_form' + id;
  taskElem.appendChild(edit_form);
  let edit_form_name = document.createElement('input');
  edit_form_name.name = 'name';
  edit_form.appendChild(edit_form_name);
  let edit_form_description = document.createElement('input');
  edit_form_description.name = 'description';
  edit_form.appendChild(edit_form_description);
  let edit_form_date = document.createElement('input');
  edit_form_date.name = 'date';
  edit_form_date.type = 'date';
  edit_form.appendChild(edit_form_date);
  let edit_form_submit = document.createElement('input');
  edit_form_submit.type = 'submit';
  edit_form.appendChild(edit_form_submit);
  edit_form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    updateTask(id, event);
  });
}

function removeEditForm(id){
  document.getElementById('edit_form' + id).remove();
}

function setTaskListeners(task, taskElem){
  if (sorttype === 'id' || sorttype === 'idinv'){
    taskElem.draggable = true;
    taskElem.addEventListener('dragstart', dragStart);
    taskElem.addEventListener('drop', dragDrop);
    taskElem.addEventListener('dragover', dragOver);
    taskElem.addEventListener('dragenter', dragEnter);
    taskElem.addEventListener('dragleave', dragLeave);
  }

  taskElem.querySelector('button[class="task__edit-btn"]').addEventListener('click', () =>{
    if (taskElem.classList.contains('form-opened')){
      removeEditForm(task.id);
      taskElem.classList.remove('form-opened');
    }
    else{
      createEditForm(task.id, taskElem, task);
      taskElem.classList.add('form-opened');
    }
  })

  taskElem.querySelector('button[class="task__remove-btn"]').addEventListener('click', () =>{
    removeTask(task.id);
  })

  taskElem.querySelector('#task-status__new').addEventListener('change', () => {
		changeTaskStatus(task.id, 1);
  })
  taskElem.querySelector('#task-status__inprogress').addEventListener('change', () => {
		changeTaskStatus(task.id, 2);
  })
  taskElem.querySelector('#task-status__done').addEventListener('change', () => {
		changeTaskStatus(task.id, 3);
  })
}

const add_task_window = document.createElement('section');
main_container.appendChild(add_task_window);

const task_form = document.createElement('form');
add_task_window.appendChild(task_form);

const task_form_name = document.createElement('div');
task_form.appendChild(task_form_name);
const task_form_name_label = document.createElement('label');
task_form_name_label.textContent = 'name:';
task_form_name_label.for = 'task-name';
task_form_name.appendChild(task_form_name_label);
const task_form_name_input = document.createElement('input');
task_form_name_input.name = 'task-name';
task_form_name_input.required = true;
task_form_name.appendChild(task_form_name_input);

const task_form_description = document.createElement('div');
task_form.appendChild(task_form_description);
const task_form_description_label = document.createElement('label');
task_form_description_label.textContent = 'description:';
task_form_description_label.for = 'task-description';
task_form_description.appendChild(task_form_description_label);
const task_form_description_input = document.createElement('textarea');
task_form_description_input.name = 'task-description';
task_form_description.appendChild(task_form_description_input);

const task_form_date = document.createElement('div');
task_form.appendChild(task_form_date);
const task_form_date_label = document.createElement('label');
task_form_date_label.textContent = 'date:';
task_form_date_label.for = 'task-date';
task_form_date.appendChild(task_form_date_label);
const task_form_date_input = document.createElement('input');
task_form_date_input.name = 'task-date';
task_form_date_input.type = 'date';
task_form_date_input.required = true;
task_form_date.appendChild(task_form_date_input);

const task_form_submit = document.createElement('input');
task_form_submit.type = 'submit';
task_form.appendChild(task_form_submit);
task_form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  addTask(event);
});
task_form_submit.value = 'add new task';

if (localStorage.getItem('tasklist-test')){
	taskList = JSON.parse(localStorage.getItem('tasklist-test'));
}

updateTasks();