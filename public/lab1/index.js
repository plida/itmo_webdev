function addToCart(id, price){
	if (id === undefined || price === undefined){
		return;
	}
	let item = cart.find(item => item.id === id);
	if (item === undefined){
		let cartItem = {
			id: id,
			price: price,
			quantity: 1
		};
		cart.push(cartItem);
	}
	else{
		item.quantity++;
	}
	updateCart();
}

function removeFromCart(id){
	let item = cart.find(item => item.id === id);
	if (item !== undefined){
		item.quantity--;
		if (item.quantity-- < 1){
			let n = cart.indexOf(item);
			cart.splice(n, 1);
		}
	}
	updateCart();
}

function clearCart(){
	cart = [];
	updateCart();
}


function updateCart(){
	let cartDisplaySum = document.getElementById("cart_sum");
	let cartDisplayCount = document.getElementById("cart_count")
	let cartContents = document.getElementById("cart_contents")

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
		cartContents.innerHTML = "";
		let list = cartContents.querySelector("ul");
		if (list !== undefined){
			for (item of cart){
				let listItem = document.createElement('li');
				listItem.appendChild(document.createTextNode(item.id + " " + item.price + "₽ " + item.quantity));
				cartContents.append(listItem);
			}
		}
	}

	localStorage.setItem("cart", JSON.stringify(cart));
}


let cart = [];

if (localStorage.getItem("cart")){
	cart = JSON.parse(localStorage.getItem("cart"));
}

updateCart();


let productList = document.getElementById('product-list');

if (productList !== null){
productList.addEventListener('click', (event) => {
	const isButton = event.target.nodeName === 'BUTTON';
	if (isButton) {
		addToCart(event.target.dataset.id, event.target.dataset.price);
		//removeFromCart(event.target.dataset.id);
	}
})
}

