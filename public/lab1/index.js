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
                let cartClone = cartContents.cloneNode(true);
		let list = cartClone.querySelector("ul");
		list.innerHTML = "";
		if (list){
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
				listItem.appendChild(document.createTextNode(item.id + " " + item.price + "₽ " + item.quantity));
				listItem.appendChild(plusBtn);
				listItem.appendChild(minsBtn);
				listItem.appendChild(rmveBtn);
				list.append(listItem);

			}
		}
		cartClone.addEventListener('click', (event) => {
                                        const isButton = event.target.nodeName === 'BUTTON';
                                        if (isButton && event.target.classList.contains('plusBtn')){
						addToCart(event.target.id.slice(7), 150);
                                        }
					if (isButton && event.target.classList.contains('minsBtn')){
						removeFromCart(event.target.id.slice(7));
                                        }
					if (isButton && event.target.classList.contains('rmveBtn')){
						removeFromCart(event.target.id.slice(7), true);
					}
                                })
		// cloning removes existing event listeners
		cartContents.parentNode.appendChild(cartClone);
		cartContents.remove();
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


