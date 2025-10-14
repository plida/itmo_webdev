// VARIABLES
const STATUSES = ['', 'incomplete', 'in progress', 'complete'];

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
    if (task.status > 0 && task.status != statusFilter){
      continue;
    }

    let taskElem = document.createElement('li');
    taskElem.setAttribute('index', task.id)
    setTaskDOM(task, taskElem);
    listUL_clone.appendChild(taskElem);
  }
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


const task_search = document.createElement('section');
task_window.appendChild(task_search);
const task_search_input = document.createElement('input');
task_search.appendChild(task_search_input);


const task_sort = document.createElement('section');
task_window.appendChild(task_sort);
const task_sort_date = document.createElement('button');
task_sort_date.textContent = 'sort by date';
task_sort.appendChild(task_sort_date);
const task_sort_id = document.createElement('button');
task_sort_id.textContent = 'sort by ID';
task_sort.appendChild(task_sort_id);


const task_filter = document.createElement('fieldset');
task_window.appendChild(task_filter);
const task_filter_legend = document.createElement('legend');
task_filter_legend.textContent = 'filter by status';
task_filter.appendChild(task_filter_legend);

const task_filter_incomplete = document.createElement('div');
task_filter.appendChild(task_filter_incomplete);
const task_filter_incomplete_input = document.createElement('input');
task_filter_incomplete_input.type = 'radio';
task_filter_incomplete_input.name = 'task-filter-status';
task_filter_incomplete_input.id = 'task-filter-status__incomplete';
task_filter_incomplete_input.value = 1;
task_filter_incomplete_input.checked = 'checked';
task_filter_incomplete.appendChild(task_filter_incomplete_input);
const task_filter_incomplete_label = document.createElement('label');
task_filter_incomplete_label.for = 'task-filter-status__incomplete';
task_filter_incomplete_label.textContent = 'incomplete';
task_filter_incomplete.appendChild(task_filter_incomplete_label);

const task_filter_inprogress = document.createElement('div');
task_filter.appendChild(task_filter_inprogress);
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

const task_filter_complete = document.createElement('div');
task_filter.appendChild(task_filter_complete);
const task_filter_complete_input = document.createElement('input');
task_filter_complete_input.type = 'radio';
task_filter_complete_input.name = 'task-filter-status';
task_filter_complete_input.id = 'task-filter-status__complete';
task_filter_complete_input.value = 3;
task_filter_complete.appendChild(task_filter_complete_input);
const task_filter_complete_label = document.createElement('label');
task_filter_complete_label.for = 'task-filter-status__complete';
task_filter_complete_label.textContent = 'complete';
task_filter_complete.appendChild(task_filter_complete_label);

const task_filter_all = document.createElement('div');
task_filter.appendChild(task_filter_all);
const task_filter_all_input = document.createElement('input');
task_filter_all_input.type = 'radio';
task_filter_all_input.name = 'task-filter-status';
task_filter_all_input.id = 'task-filter-status__all';
task_filter_all_input.value = 4;
task_filter_all.appendChild(task_filter_all_input);
const task_filter_all_label = document.createElement('label');
task_filter_all_label.for = 'task-filter-status__all';
task_filter_all_label.textContent = 'all';
task_filter_all.appendChild(task_filter_all_label);


const task_form = document.createElement('form');
task_window.appendChild(task_form);

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
task_form_submit.value = 'add new task';
task_form.appendChild(task_form_submit);


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


  let task_status = document.createElement('span');
  task_status.classList.add('task__status');
  task_status.textContent = STATUSES[task.status];

  let task_status_form = document.createElement('form');
  taskElem.appendChild(task_status_form);
  let task_status_fieldset = document.createElement('fieldset');
  task_status_form.appendChild(task_status_fieldset);

  let task_status_legend = document.createElement('legend');
  task_status_legend.textContent = 'status';
  task_status_fieldset.appendChild(task_status);

  let task_status_incomplete = document.createElement('div');
  task_status.appendChild(task_status_incomplete);
  let task_status_incomplete_input = document.createElement('input');
  task_status_incomplete_input.type = 'radio';
  task_status_incomplete_input.name = 'task-status';
  task_status_incomplete_input.id = 'task-status__incomplete';
  task_status_incomplete_input.value = 1;
  task_status_incomplete_input.checked = 'checked';
  task_status_incomplete.appendChild(task_status_incomplete_input);
  let task_status_incomplete_label = document.createElement('label');
  task_status_incomplete_label.for = 'task-status__incomplete';
  task_status_incomplete_label.textContent = 'incomplete';
  task_status_incomplete.appendChild(task_status_incomplete_label);

  let task_status_inprogress = document.createElement('div');
  task_status.appendChild(task_status_inprogress);
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

  let task_status_complete = document.createElement('div');
  task_status.appendChild(task_status_complete);
  let task_status_complete_input = document.createElement('input');
  task_status_complete_input.type = 'radio';
  task_status_complete_input.name = 'task-status';
  task_status_complete_input.id = 'task-status__complete';
  task_status_complete_input.value = 3;
  task_status_complete.appendChild(task_status_complete_input);
  let task_status_complete_label = document.createElement('label');
  task_status_complete_label.for = 'task-status__complete';
  task_status_complete_label.textContent = 'complete';
  task_status_complete.appendChild(task_status_complete_label);

  switch (task.status){
    case 1:
      task_status_incomplete_input.checked = 'checked';
      break;
    case 2:
      task_status_inprogress_input.checked = 'checked';
      break;
    case 3:
      task_status_complete_input.checked = 'checked';
      break;
  }


  let task_remove = document.createElement('button');
  task_remove.classList.add('task__remove-btn');
  task_remove.id = 'task_remove-btn' + task.id;
  taskElem.appendChild(task_remove);
}


if (localStorage.getItem('tasklist')){
	taskList = JSON.parse(localStorage.getItem('tasklist-test'));
}

updateTasks();