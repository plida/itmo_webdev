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