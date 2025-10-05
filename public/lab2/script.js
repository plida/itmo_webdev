// PAGE
const PAGE_BODY = document.body;
const PAGE_HEADER = document.createElement('HEADER');
const PAGE_MAIN = document.createElement('MAIN');
const PAGE_FOOTER = document.createElement('FOOTER');
PAGE_BODY.appendChild(PAGE_HEADER);
PAGE_BODY.appendChild(PAGE_MAIN);
PAGE_BODY.appendChild(PAGE_FOOTER);

// HEADER
const HEADER_NAV = document.createElement('nav');
PAGE_HEADER.appendChild(HEADER_NAV);
// NAVIGATION
const HEADER_LIST = document.createElement('ul');
HEADER_NAV.appendChild(HEADER_LIST);
const HEADER_LOGO = document.createElement('li');
const HEADER_LOGO_LINK = document.createElement('a');
HEADER_LOGO_LINK.href = 'index.html';
HEADER_LOGO_LINK.classList.add('disabled');
HEADER_LOGO.appendChild(HEADER_LOGO_LINK)
const HEADER_LOGO_IMAGE = document.createElement('img');
HEADER_LOGO_IMAGE.src = 'media/3.png';
HEADER_LOGO_LINK.appendChild(HEADER_LOGO_IMAGE)
const HEADER_LOGO_LONG = document.createElement('h1');
const HEADER_LOGO_MIDDLE = document.createElement('h1');
HEADER_LOGO_LONG.textContent = "Plida's cool To-Do list \r\nWeb programming lab work #2";
HEADER_LOGO_MIDDLE.textContent = "Plida's cool To-Do list";
HEADER_LOGO_LONG.classList.add('site-name-long');
HEADER_LOGO_MIDDLE.classList.add('site-name-middle');
HEADER_LOGO_LINK.appendChild(HEADER_LOGO_LONG);
HEADER_LOGO_LINK.appendChild(HEADER_LOGO_MIDDLE);
const HEADER_GIT = document.createElement('li');
const HEADER_GIT_LINK = document.createElement('a');
HEADER_GIT_LINK.href = 'https://github.com/plida/itmo_webdev/tree/main/public/lab2';
HEADER_GIT.appendChild(HEADER_GIT_LINK);
const HEADER_GIT_IMAGE = document.createElement('img');
HEADER_GIT_IMAGE.src = 'media/Octicons-mark-github.svg.png';
HEADER_GIT_LINK.appendChild(HEADER_GIT_IMAGE);
HEADER_LIST.appendChild(HEADER_LOGO);
HEADER_LIST.appendChild(HEADER_GIT);

// FOOTER
const PAGE_FOOTER_TEXT = document.createElement('span');
PAGE_FOOTER_TEXT.textContent = 'Plida 2025';
PAGE_FOOTER.append(PAGE_FOOTER_TEXT);

// MAIN
const TASK_LIST = document.createElement('section');
TASK_LIST.classList.add('task-list');
const TASK_LIST_SEARCH = document.createElement('input');
TASK_LIST_SEARCH.addEventListener('keyup', (event) => {listTasks(event.target.value)})
TASK_LIST.appendChild(TASK_LIST_SEARCH);

const TASK_LIST_SORT = document.createElement('section');
TASK_LIST.appendChild(TASK_LIST_SORT);
const TASK_LIST_SORT_DATE = document.createElement('button');
TASK_LIST_SORT_DATE.textContent = "Sort by date";
TASK_LIST_SORT_DATE.addEventListener('click', (event) => {
  if (sorttype === "date"){
    sorttype = "dateinv";
  }
  else{
    sorttype = "date";
  }
  listTasks();
})
TASK_LIST_SORT.appendChild(TASK_LIST_SORT_DATE);

const TASK_LIST_FILTER = document.createElement('section');
const FILTER_INCOMPLETE = document.createElement('input');
FILTER_INCOMPLETE.type = 'radio';
FILTER_INCOMPLETE.name = 'status';
FILTER_INCOMPLETE.value = 1;
const FILTER_INPROGRESS = document.createElement('input');
FILTER_INPROGRESS.type = 'radio';
FILTER_INPROGRESS.name = 'status';
FILTER_INPROGRESS.value = 2;
const FILTER_COMPLETE = document.createElement('input');
FILTER_COMPLETE.type = 'radio';
FILTER_COMPLETE.name = 'status';
FILTER_COMPLETE.value = 3;
const FILTER_RESET = document.createElement('input');
FILTER_RESET.type = 'radio';
FILTER_RESET.name = 'status';
FILTER_RESET.value = 0;
FILTER_FORM = document.createElement('form');
FILTER_FIELDSET = document.createElement('fieldset');
TASK_LIST_FILTER.appendChild(FILTER_FORM);
FILTER_FORM.appendChild(FILTER_FIELDSET);
FILTER_FIELDSET.appendChild(FILTER_INCOMPLETE)
FILTER_FIELDSET.appendChild(FILTER_INPROGRESS)
FILTER_FIELDSET.appendChild(FILTER_COMPLETE)
FILTER_FIELDSET.appendChild(FILTER_RESET)
TASK_LIST.appendChild(TASK_LIST_FILTER);

TASK_LIST_SEARCH.addEventListener('keyup', (event) => {nameFilter = event.target.value; listTasks()})
TASK_LIST.appendChild(TASK_LIST_SEARCH);

const TASK_LIST_UL = document.createElement('ul');
TASK_LIST.append(TASK_LIST_UL);
PAGE_MAIN.append(TASK_LIST);
const TASK_FORM = document.createElement('form');
const TASK_FORM_NAME = document.createElement('input');
TASK_FORM_NAME.name = 'name';
TASK_FORM_NAME.required = true;
const TASK_FORM_DESCRIPTION = document.createElement('input');
TASK_FORM_DESCRIPTION.name = 'description';
const TASK_FORM_DATE = document.createElement('input');
TASK_FORM_DATE.name = 'date';
TASK_FORM_DATE.type = 'date';
TASK_FORM_DATE.required = true;
const TASK_FORM_SUBMIT = document.createElement('input');
TASK_FORM_SUBMIT.type = 'submit';
TASK_FORM.appendChild(TASK_FORM_NAME);
TASK_FORM.appendChild(TASK_FORM_DESCRIPTION);
TASK_FORM.appendChild(TASK_FORM_DATE);
TASK_FORM.appendChild(TASK_FORM_SUBMIT);
PAGE_MAIN.appendChild(TASK_FORM);

const STATUSES = ['', 'incomplete', 'in progress', 'complete'];

let taskList = [
  { id: 0, name: '1', description: 'aaa', date: "2018-07-22", status: 1 },
  { id: 1, name: '2', description: 'bbb', date: "2019-07-22", status: 2 },
  { id: 2, name: '3', description: 'ccc', date: "2020-07-22", status: 3 },
];

sorttype = "status";

nameFilter = "";
statusFilter = 0;

function compareID( a, b ) {
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



function listTasks(){
  let list_UL = TASK_LIST.querySelector('ul');
  let list_UL_clone = list_UL.cloneNode(true)
  list_UL_clone.textContent = '';

  let taskListClone = structuredClone(taskList);

  if (sorttype === "date"){
    taskListClone = taskListClone.sort(compareDate);
  }
  else if (sorttype === "dateinv"){
    taskListClone = taskListClone.sort(compareDateInv);
  }
  for (task of taskListClone){
    let taskElem = document.createElement('li');
    taskElem.textContent = task.name + ' ' + task.description + ' ' + task.date;
    let taskElemBtn = document.createElement('button');
    taskElemBtn.classList.add('task__remove-btn');
    taskElemBtn.id = 'task_remove-btn' + task.id;
    taskElem.appendChild(taskElemBtn);
    taskElemBtn.addEventListener('click', (event) => {
		  removeTask(event.target.id.slice('task_remove-btn'.length));
    })
    let taskStatus = document.createElement('span');
    taskStatus.textContent = STATUSES[task.status];
    taskElem.appendChild(taskStatus);
    txtValue = taskElem.textContent;
      
    if (statusFilter > 0){
      statusFilter = parseInt(statusFilter);
      if (task.status === statusFilter){
        console.log("!", task.status);
        taskElem.style.display = "";
      }
      else{
        taskElem.style.display = "none";
      }
    }

    nameFilter = nameFilter.toUpperCase();
    if (txtValue.toUpperCase().indexOf(nameFilter) === -1) {
      taskElem.style.display = "none";
    } 
    

    list_UL_clone.appendChild(taskElem);
  }
  TASK_LIST.appendChild(list_UL_clone);
  list_UL.remove();
}

function addTask(){
  const data = new FormData(TASK_FORM);
  let taskListClone = structuredClone(taskList);
  taskListClone.sort(compareID);
  let highestID = taskListClone[0].id;
  taskList.push({
    id: highestID + 1,
    name: data.get('name'), 
    description: data.get('description'),
    date: data.get('date'),
    status: 0
  });
  updateTasks();
}

function removeTask(id){
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined){
    return;
  } 
  let n = taskList.indexOf(item);
  taskList.splice(n, 1);
  item.quantity = 0;
  updateTasks();
}

function updateTasks(){
  localStorage.setItem('tasklist', JSON.stringify(taskList)); 
  listTasks();
}

TASK_FORM.addEventListener('submit', (event) => {
  event.preventDefault(); 
  addTask(event);
});

document.querySelectorAll('input[type="radio"][name="status"]').forEach(radio => {
    radio.addEventListener('change', (event) => {statusFilter = event.target.value; listTasks()});
});


if (localStorage.getItem('tasklist')){
	taskList = JSON.parse(localStorage.getItem('tasklist'));
}

updateTasks();


