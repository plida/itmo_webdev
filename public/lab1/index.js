function addToCart(id){
	if (id === undefined){
		return;
	}
	let item = cart.find(item => item.id === id);
	if (item === undefined){
		let cartItem = {
			id: id,
			price: lookupTable[id].price,
			name: lookupTable[id].name,
			quantity: 1
		};
		cart.push(cartItem);
	}
	else{
		item.quantity++;
	}
	updateCart();
}

function removeFromCart(id, removeFully = false){
	let item = cart.find(item => item.id === id);

	if (item){
		item.quantity--;
		if (item.quantity < 1 || removeFully){
			let n = cart.indexOf(item);
			cart.splice(n, 1);
			item.quantity = 0;
		}
	}
	updateCart();
}

function emptyCart(){
	cart = [];
	updateCart();
}


function updateCart(){
	let cartDisplaySum = document.getElementById('cart_sum');
	let cartDisplayCount = document.getElementById('cart_count');
	let cartButtonCount = document.getElementById('cart_button-count')
	let cartContents = document.getElementById('cart_contents');

	let sum = 0;
	let count = 0;

	for (item of cart){
                        count += item.quantity;
                        sum += item.price * item.quantity;
                }

	if (cartDisplaySum){
		cartDisplaySum.textContent = sum;
	}
	if (cartDisplayCount){
                cartDisplayCount.textContent = count;
        }
	if (cartButtonCount){
		cartButtonCount.textContent = count;
	}

	if (cartContents){
		populateCartContents(cartContents);
	}

	let orderBtn = document.getElementById('placeOrder');
	if (orderBtn && count > 0){orderBtn.disabled = false;}
	if (orderBtn && count === 0){orderBtn.disabled = true;}
	
	let emptyBtn = document.getElementById('emptyCart');
        if (emptyBtn && count > 0){emptyBtn.disabled = false;}  
        if (emptyBtn && count === 0){emptyBtn.disabled = true;}
		
	for (const [key, value] of Object.entries(lookupTable)){
                let menuCount = document.getElementById('menuCount' + key);
                if (menuCount){
			menuCount.innerText = '0';
		}
        }

	for (item of cart){
		let menuCount = document.getElementById('menuCount' + item.id);
        	if (menuCount){
			menuCount.innerText = item.quantity;
		}
	}

	localStorage.setItem('cart', JSON.stringify(cart));
}

function populateCartContents(cartContents){
	let list = cartContents.querySelector('ul');
	listClone = list.cloneNode(true);
	listClone.innerHTML = '';
	for (item of cart){
		let listItem = document.createElement('li');
		let plusBtn = document.createElement('button');
			plusBtn.innerText = '+';
			plusBtn.classList.add('plusBtn');
			plusBtn.id = 'plusbtn' + item.id;
		let minsBtn = document.createElement('button');
			minsBtn.innerText = '-';
			minsBtn.classList.add('minsBtn');
			minsBtn.id = 'minsbtn' + item.id;
		let rmveBtn = document.createElement('button');
			rmveBtn.innerText = 'remove';
			rmveBtn.classList.add('rmveBtn');
			rmveBtn.id = 'rmvebtn' + item.id;
		listItem.appendChild(document.createTextNode(item.name + " " + item.price + "₽ " + item.quantity));
		listItem.appendChild(plusBtn);
		listItem.appendChild(minsBtn);
		listItem.appendChild(rmveBtn);
		listClone.append(listItem);
	}
	listClone.addEventListener('click', (event) => {
		const isButton = event.target.nodeName === 'BUTTON';
		if (isButton && event.target.classList.contains('plusBtn')){
			addToCart(event.target.id.slice(7));
		}
		if (isButton && event.target.classList.contains('minsBtn')){
			removeFromCart(event.target.id.slice(7));
		}
		if (isButton && event.target.classList.contains('rmveBtn')){
			removeFromCart(event.target.id.slice(7), true);
		}
	})
	// cloning removes existing event listeners
	list.parentNode.appendChild(listClone);
	list.remove();
}

function populateProductList(){
	let list = document.getElementById('product-list')
	if (list === null){
		return;
	}
	let listClone = list.cloneNode(true);
	listClone.innerHTML = "";
	for (const [key, value] of Object.entries(lookupTable)){
                let item = value;
                let listItem = document.createElement('li');
			listItem.classList.add('itemCard');
		let image = document.createElement('img');
			image.classList.add('itemCardImage');
			image.src = item.img;
		let text = document.createElement('div');
			text.classList.add('itemCardText');
			let heading = document.createElement('span');
				heading.textContent = item.name;
			let weight = document.createElement('span');
				weight.textContent = item.weight;
			let price = document.createElement('span');
				price.textContent = item.price;
			text.appendChild(heading);
			text.appendChild(weight);
			text.appendChild(price);
		let addBtnMenu = document.createElement('div');
                        addBtnMenu.classList.add('itemCardButton');
		let addBtn = document.createElement('button');
       			addBtn.innerText = 'Add to cart';
			addBtn.classList.add('addBtn');
			addBtn.id = 'addbtn' + key;
			addBtn.classList.add('show');
		addBtnMenu.appendChild(addBtn);
		let menu = document.createElement('div');
			menu.classList.add('itemCardMenu');
			menu.id = 'cardMenu' + key;
			menu.classList.add('fully-hide');
			let plusBtn = document.createElement('button');
				plusBtn.innerText = '+';
				plusBtn.classList.add('plusBtn');
				plusBtn.id = 'plusbtn' + key;
			let menuCount = document.createElement('span');
				menuCount.id = "menuCount" + key;
				menuCount.innerText = '0';
			let minsBtn = document.createElement('button');
				minsBtn.innerText = '-';
				minsBtn.classList.add('minsBtn');
				minsBtn.id = 'minsbtn' + key;
			menu.appendChild(plusBtn);
	                menu.appendChild(menuCount);
        	        menu.appendChild(minsBtn);

                listItem.appendChild(image);
		listItem.appendChild(text);
                listItem.appendChild(addBtnMenu);
		listItem.appendChild(menu);
                listClone.append(listItem);
        }


	listClone.addEventListener('click', (event) => {
		const isButton = event.target.nodeName === 'BUTTON';
		if (isButton && event.target.classList.contains('addBtn')){
			addToCart(event.target.id.slice(6));
			swapAddToMenu(event.target);
		}
		if (isButton && event.target.classList.contains('plusBtn')){
                        addToCart(event.target.id.slice(7));
                }
                if (isButton && event.target.classList.contains('minsBtn')){
                        removeFromCart(event.target.id.slice(7));
			let id = event.target.id.slice(7);
			let item = cart.find(item => item.id === event.target.id.slice(7));
			if (item === undefined){
				swapMenuToAdd(event.target.parentNode);
			};
                }
	})
	// cloning removes existing event listeners
	list.parentNode.appendChild(listClone);
	list.remove();
}


function acceptForm(event){
	emptyCart();
	closeOrderForm();
	alert("The order was successfuly placed!");
	event.preventDefault();
}

function swapAddToMenu(addBtn){
	addBtn.classList.add('fully-hide');
        let itemCardMenu = document.getElementById('cardMenu' + addBtn.id.slice(6));
        itemCardMenu.classList.remove('fully-hide');
}

function swapMenuToAdd(menu){
        menu.classList.add('fully-hide');
        let addBtn = document.getElementById('addbtn' + menu.id.slice(8));
        addBtn.classList.remove('fully-hide');
}


const lookupTable = {
	"1": { name: 'Apples', weight:"1kg", price: 150, img: 'media/shelley-pauls-unsplash.jpg'},
	"2": { name: 'Tangerines', weight:"1kg", price: 250, img: 'media/erol-ahmed-unsplash.jpg'},
	"3": { name: 'Bananas', weight:"1kg", price: 100, img: 'media/ries-bosch-unsplash.jpg'},
	"4": { name: 'Pineapples', weight:"1kg", price: 400, img: 'media/phoenix-han-unsplash.jpg'},
	"5": { name: 'Pears', weight:"1kg", price: 150, img: 'media/maksim-shutov-unsplash.jpg'},
        "6": { name: 'Grape', weight:"1kg", price: 250, img: 'media/alexander-schimmeck-unsplash.jpg'},
        "7": { name: 'Cherries', weight:"1kg", price: 100, img: 'media/roksolana-zasiadko-unsplash.jpg'},
        "8": { name: 'Strawberries', weight:"1kg", price: 400, img: 'media/massimiliano-martini-unsplash.jpg'},
	"9": { name: 'Peaches', weight:"1kg", price: 400, img: 'media/eric-prouzet-unsplash.jpg'},
}

populateProductList();

let cart = [];

if (localStorage.getItem('cart')){
	cart = JSON.parse(localStorage.getItem('cart'));
}

updateCart();

for (item of cart){
	let menuCount = document.getElementById('menuCount' + item.id);
	if (menuCount){
		let addButton = document.getElementById('addbtn' + item.id);
		if (addButton){
			swapAddToMenu(addButton);
		}
	}
}

let productList = document.getElementById('product-list');

if (productList !== null){
productList.addEventListener('click', (event) => {
	const isButton = event.target.nodeName === 'BUTTON';
	if (isButton) {
		addToCart(event.target.dataset.id);
	}
})
}


function openOrderForm(){
	let orderFormMenu = document.getElementById('orderForm');
	if (orderFormMenu.classList.contains('show') === false){
		orderFormMenu.classList.add('show');
	}
}

function closeOrderForm(){
        let orderFormMenu = document.getElementById('orderForm');
        if (orderFormMenu.classList.contains('show') === true){
                orderFormMenu.classList.remove('show');
        }
}

let orderForm = document.getElementById('orderForm');
if (orderForm !== null){
	orderForm.addEventListener('submit', (event) => {acceptForm(event)});
}

let cartButton = document.getElementsByClassName('cart_button')[0];
if (cartButton){
	let cartButtonPopup = cartButton.getElementsByClassName('popup')[0];
	if (cartButtonPopup){
		cartButton.addEventListener('mouseover', function(){
       	        	if (cartButtonPopup.classList.contains('show') === false){
				cartButtonPopup.classList.add('show');
			}
	     	})
	        cartButton.addEventListener('mouseout', function(){
        		if (cartButtonPopup.classList.contains('show') === true){
                                cartButtonPopup.classList.remove('show');
                        }
		})
	}
}

