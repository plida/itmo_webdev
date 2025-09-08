const LOOKUP_TABLE = {
  '1': { name: 'Apples red crispy farmer market', weight:'1 lb', price: 1.99, img: 'media/shelley-pauls-unsplash.jpg'},
  '2': { name: 'Tangerines fresh', weight:'1 lb', price: 1.59, img: 'media/erol-ahmed-unsplash.jpg'},
  '3': { name: 'Bananas', weight:'1 lb', price: 0.56, img: 'media/ries-bosch-unsplash.jpg'},
  '4': { name: 'Pineapples', weight:'1 lb', price: 0.99, img: 'media/phoenix-han-unsplash.jpg'},
  '5': { name: 'Pears', weight:'1 lb', price: 2.19, img: 'media/maksim-shutov-unsplash.jpg'},
  '6': { name: 'Grape', weight:'1 oz', price: 0.19, img: 'media/alexander-schimmeck-unsplash.jpg'},
  '7': { name: 'Cherries', weight:'1 oz', price: 0.18, img: 'media/roksolana-zasiadko-unsplash.jpg'},
  '8': { name: 'Strawberries', weight:'1 oz', price: 0.19, img: 'media/massimiliano-martini-unsplash.jpg'},
  '9': { name: 'Peaches', weight:'1 lb', price: 2.37, img: 'media/eric-prouzet-unsplash.jpg'},
}

let cart = [];

if (localStorage.getItem('cart')){
	cart = JSON.parse(localStorage.getItem('cart'));
}

populateProductList();
updateCart();

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('empty-cart-btn')){
    emptyCart();
  }
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('open-order-form-btn')){
    openOrderForm();
  }
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-order-form-btn')){
    closeOrderForm();
  }
})

let orderForm = document.querySelector('.order-form');
if (orderForm !== null){
	orderForm.addEventListener('submit', (event) => {acceptForm(event)});
}

for (item of cart){
  let addButton = document.querySelector('#item__add-btn' + item.id);
  if (addButton){
    swapAddToMenu(addButton);
  }
}

function addToCart(id){
  if (id === undefined){
    return;
  }
  let item = cart.find(item => item.id === id);
  if (item === undefined){
    let newItem = {
      id: id,
      quantity: 1
    };
    cart.push(newItem);
  }
  else{
    item.quantity++;
  }
  updateCart();
}

function removeFromCart(id, removingFully = false){
  let item = cart.find(item => item.id === id);
  if (item === undefined){
    return;
  } 
  item.quantity--;
  if (item.quantity < 1 || removingFully){
    let n = cart.indexOf(item);
		cart.splice(n, 1);
		item.quantity = 0;
  }
  updateCart();
}

function emptyCart(){
  cart = [];
  updateCart();
}

function updateCart(){
 localStorage.setItem('cart', JSON.stringify(cart)); 
 populateCartContents();
 updateCartCountTotal();
}

function updateCartCountTotal(){
  let sum = 0;
  let count = 0;
  for (item of cart){
    count += item.quantity;
    sum += LOOKUP_TABLE[item.id].price * item.quantity;
  }
  sum = Math.round(sum * 100)/ 100;
  sum = sum.toFixed(2)

  let cartCountDisplays = document.querySelectorAll('.cart-count');
  for (let cartCount of cartCountDisplays){
    if (cartCount.classList.contains('limit-99') && count > 99){
      cartCount.textContent = '99+';
    }
    else{
      cartCount.textContent = count;
    }
  }
  let cartSumDisplays = document.querySelectorAll('.cart-total');
  for (let cartSum of cartSumDisplays){
    cartSum.textContent = '$' + sum;
  }

  let orderBtns = document.querySelectorAll('.open-order-form-btn');
  for (let orderBtn of orderBtns){
    if (count === 0){
      orderBtn.disabled = true;
    }
    else{
      orderBtn.disabled = false;
    }
  }
  let emptyCartBtns = document.querySelectorAll('.empty-cart-btn');
  for (let emptyBtn of emptyCartBtns){
    if (count === 0){
      emptyBtn.disabled = true;
    }
    else{
      emptyBtn.disabled = false;
    }
  }
  for (item of cart){
    let addToCartBtn = document.querySelector('#item__add-btn' + item.id);
    let incrementBtn = document.querySelector('#increment-btn' + item.id);
    let decrementBtn = document.querySelector('#decrement-btn' + item.id);
    if (item.quantity >= 99){
      if (addToCartBtn){
        addToCartBtn.disabled = true;
      }
      if (incrementBtn){
        incrementBtn.disabled = true;
      }
    }
    else if (item.quantity <= 0){
      if (decrementBtn){
        decrementBtn.disabled = true;
      }
    }
    else{
      if (addToCartBtn){
        addToCartBtn.disabled = false;
      }
      if (incrementBtn){
        incrementBtn.disabled = false;
      }
      if (decrementBtn){
        decrementBtn.disabled = false;
      }
    }
  }

  for (const [key, value] of Object.entries(LOOKUP_TABLE)){
    let itemCount = 0;
    let itemTotal = 0;
    
    let item = cart.find(item => item.id === key); 
    if (item){
      itemCount = item.quantity;
      itemTotal = value.price * item.quantity;
      itemTotal = Math.round(itemTotal * 100)/ 100;
      itemTotal = itemTotal.toFixed(2);
    }
    
    let menuCounts = document.querySelectorAll('#menu__count' + key);
    for (let menuCount of menuCounts){
     menuCount.innerText = itemCount;
    }

    let itemTotals = document.querySelectorAll('#item__total' + key);
    for (let itemTotalCost of itemTotals){
     itemTotalCost.innerText = '$' + itemTotal;
    }
  }
}

function populateCartContents(){
  let cartContents = document.querySelector('.cart-contents');
  if (cartContents === null){
    return;
  }
  
  let list = cartContents.querySelector('ul');
  if (cart.length === 0){
    list.innerHTML = 'Nothing here!';
    return;
  }
  listClone = list.cloneNode(true);
  listClone.innerHTML = '';
  for (item of cart){
    const LOOKUP_ITEM = LOOKUP_TABLE[item.id];

    let listItem = document.createElement('li');
      listItem.classList.add('cart-contents__item');

    let image = document.createElement('img');
      image.src = LOOKUP_ITEM.img;
      image.alt = LOOKUP_ITEM.name;
    let text = document.createElement('span');
      text.classList.add('item__text');
      text.innerHTML = LOOKUP_ITEM.name + ' ' + 
      LOOKUP_ITEM.weight.replaceAll(' ', '\xa0') + '<br />' + '$' + LOOKUP_ITEM.price;
    let totalPrice = document.createElement('span');
      totalPrice.classList.add('item__total');
      totalPrice.id = 'item__total' + item.id;
    
    let menu = document.createElement('div');
      menu.classList.add('item__menu');
      menu.id = 'item__menu' + item.id;
      menu.classList.add('item__input-panel');
    let incrementBtn = document.createElement('button');
      incrementBtn.classList.add('increment-btn');
      incrementBtn.classList.add('item__button')
      incrementBtn.id = 'increment-btn' + item.id;
    let decrementBtn = document.createElement('button');
      decrementBtn.classList.add('decrement-btn');
      decrementBtn.classList.add('item__button')
      decrementBtn.id = 'decrement-btn' + item.id;
    let menuCount = document.createElement('span');
      menuCount.id = 'menu__count' + item.id;
      
    menu.append(decrementBtn);
    menu.append(menuCount);
    menu.append(incrementBtn);

    let removeBtn = document.createElement('button');
      removeBtn.classList.add('item__remove-btn');
      removeBtn.id = 'item__remove-btn' + item.id;
      removeBtn.classList.add('item__button')
    
    listItem.append(removeBtn);
    listItem.append(image);
    listItem.append(text);
    listItem.append(totalPrice);
    listItem.append(menu);

    listClone.append(listItem);
  }

  listClone.addEventListener('click', (event) => {
		if (event.target.classList.contains('increment-btn')){
			addToCart(event.target.id.slice(13));
		}
		if (event.target.classList.contains('decrement-btn')){
			removeFromCart(event.target.id.slice(13));
		}
		if (event.target.classList.contains('item__remove-btn')){
			removeFromCart(event.target.id.slice(16), true);
		}
	})

  list.parentNode.appendChild(listClone);
	list.remove();
}

function populateProductList(){
  let productList = document.querySelector('.product-list');
  if (productList === null){
    return;
  }

  let list = productList.querySelector('ul');
  listClone = list.cloneNode(true);
  listClone.innerHTML = '';
  for (const [key, LOOKUP_ITEM] of Object.entries(LOOKUP_TABLE)){
    let listItem = document.createElement('li');
      listItem.classList.add('product-list__item');

    let listItemContent = document.createElement('div');
      listItemContent.classList.add('item__contents')

    let image = document.createElement('img');
      image.src = LOOKUP_ITEM.img;
      image.alt = LOOKUP_ITEM.name;
    
    let text = document.createElement('div');
      text.classList.add('item__text');
    let name = document.createElement('span');
      name.textContent = LOOKUP_ITEM.name;
      name.classList.add('item__text__name');
    let weight = document.createElement('span');
      weight.textContent = LOOKUP_ITEM.weight.replaceAll(' ', '\xa0');
      weight.classList.add('item__text__weight');
    let price = document.createElement('span');
      price.textContent = '$' + LOOKUP_ITEM.price;
      price.classList.add('item__text__price'); 
      
    let addBtn = document.createElement('button');
      addBtn.classList.add('item__add-btn');
      addBtn.classList.add('item__button');
      addBtn.classList.add('item__input-panel');
      addBtn.id = 'item__add-btn' + key;    

    let menu = document.createElement('div');
      menu.classList.add('item__menu');
      menu.classList.add('hidden');
      menu.classList.add('item__input-panel');
      menu.id = 'item__menu' + key;
    let incrementBtn = document.createElement('button');
      incrementBtn.classList.add('increment-btn');
      incrementBtn.classList.add('item__button');
      incrementBtn.id = 'increment-btn' + key;
    let decrementBtn = document.createElement('button');
      decrementBtn.classList.add('decrement-btn');
      decrementBtn.classList.add('item__button');
      decrementBtn.id = 'decrement-btn' + key;
    let menuCount = document.createElement('span');
      menuCount.id = 'menu__count' + key;

    text.append(name);
    text.append(weight);
    text.append(price);

    menu.append(decrementBtn);
    menu.append(menuCount);
    menu.append(incrementBtn);

    listItemContent.append(image);
    listItemContent.append(text);
    listItemContent.append(addBtn);
    listItemContent.append(menu);

    listItem.append(listItemContent);

    listClone.append(listItem);
  }

  listClone.addEventListener('click', (event) => {
		if (event.target.classList.contains('item__add-btn')){
			addToCart(event.target.id.slice(13));
			swapAddToMenu(event.target);
		}
		if (event.target.classList.contains('increment-btn')){
      addToCart(event.target.id.slice(13));
    }
    if (event.target.classList.contains('decrement-btn')){
      removeFromCart(event.target.id.slice(13));
			let item = cart.find(item => item.id === event.target.id.slice(13));
      if (item === undefined){
        swapMenuToAdd(event.target.parentNode);
      };
    }
	})

  list.parentNode.appendChild(listClone);
	list.remove();
}

function swapAddToMenu(addBtn){
  addBtn.classList.add('hidden');
  let menu = document.querySelector('#item__menu' + addBtn.id.slice(13));
  menu.classList.remove('hidden');
}

function swapMenuToAdd(menu){
  menu.classList.add('hidden');
  let addBtn = document.querySelector('#item__add-btn' + menu.id.slice(10));
  addBtn.classList.remove('hidden');
}

function openOrderForm(){
	let orderFormMenu = document.querySelector('.order-form');
	if (orderFormMenu.classList.contains('hidden') === true){
		orderFormMenu.classList.remove('hidden');
		document.body.classList.add('stop-scrolling');
	}
}

function closeOrderForm(){
  let orderFormMenu = document.querySelector('.order-form');
  if (orderFormMenu.classList.contains('hidden') === false){
    orderFormMenu.classList.add('hidden');
    document.body.classList.remove('stop-scrolling');
  }
}

function acceptForm(event){
	emptyCart();
	closeOrderForm();
	alert("The order was successfuly placed!");
	event.preventDefault();
}