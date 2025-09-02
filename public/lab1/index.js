function addToCart(id, price){
	if (id === undefined || price === undefined){
		return;
	}
	console.log(id, price);
}

const cart = {};

var productList = document.getElementById('product-list');
productList.addEventListener('click', (event) => {
	const isButton = event.target.nodeName === 'BUTTON';
	if (isButton) {
		addToCart(event.target.dataset.id, event.target.dataset.price);
	}
})
