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
	let cartContents = document.getElementById('cart_contents');

	let sum = 0;
	let count = 0;
	
	if (cartDisplaySum && cartDisplayCount){
		for (item of cart){
			count += item.quantity;
			sum += item.price * item.quantity;
		}
	
		cartDisplaySum.textContent = sum;
		cartDisplayCount.textContent = count;
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
	let productList = document.getElementById('product-list')
	if (productList === null){
		return;
	}
	let list = productList.querySelector("ul");
	let listClone = list.cloneNode(true);
	listClone.innerHTML = "";
	for (const [key, value] of Object.entries(lookupTable)){
		let item = value;
		let listItem = document.createElement('li');
                let addBtn = document.createElement('button');
                	addBtn.innerText = 'Add to cart';
                	addBtn.classList.add('addBtn');
                	addBtn.id = 'addbtn' + key;
		listItem.appendChild(document.createTextNode(item.name + " " + item.price + "₽ "));
		listItem.appendChild(addBtn);
		listClone.append(listItem);
	}

	listClone.addEventListener('click', (event) => {
		const isButton = event.target.nodeName === 'BUTTON';
		if (isButton && event.target.classList.contains('addBtn')){
			addToCart(event.target.id.slice(6));
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

const lookupTable = {
	"1": { name: "Apples 1kg", price: 150},
	"2": { name: "Oranges 1kg", price: 250},
	"3": { name: "Bananas 1kg", price: 100},
	"4": { name: "Pineapples", price: 400}
}

populateProductList();

let cart = [];

if (localStorage.getItem('cart')){
	cart = JSON.parse(localStorage.getItem('cart'));
}

updateCart();


let productList = document.getElementById('product-list');

if (productList !== null){
productList.addEventListener('click', (event) => {
	const isButton = event.target.nodeName === 'BUTTON';
	if (isButton) {
		addToCart(event.target.dataset.id);
		//removeFromCart(event.target.dataset.id);
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

