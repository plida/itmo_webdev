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
	var cartDisplaySum = document.getElementById("cart_sum");
	var cartDisplayCount = document.getElementById("cart_count")
	let sum = 0;
	let count = 0;

	for (item of cart){
		console.log(item, item.quantity);
		count += item.quantity;
		sum += item.price * item.quantity;
	}
	cartDisplaySum.textContent = sum;
	cartDisplayCount.textContent = count;

	localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = [];

if (localStorage.getItem("cart")){
	cart = JSON.parse(localStorage.getItem("cart"));
}

updateCart();

var productList = document.getElementById('product-list');

if (productList !== null){
productList.addEventListener('click', (event) => {
	const isButton = event.target.nodeName === 'BUTTON';
	if (isButton) {
		addToCart(event.target.dataset.id, event.target.dataset.price);
		//removeFromCart(event.target.dataset.id);
	}
})
}

