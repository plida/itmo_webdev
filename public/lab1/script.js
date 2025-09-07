const LOOKUP_TABLE = {
  '1': { name: 'Apples', weight:'1 lb', price: 1.99, img: 'media/shelley-pauls-unsplash.jpg'},
  '2': { name: 'Tangerines', weight:'1 lb', price: 1.59, img: 'media/erol-ahmed-unsplash.jpg'},
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

updateCart();

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
 updateCartCountTotal();
 populateCartContents();
}

function updateCartCountTotal(){
  let sum = 0;
  let count = 0;
  for (item of cart){
    count += item.quantity;
    sum += LOOKUP_TABLE[item.id].price * item.quantity;
  }
  sum = Math.round(sum * 100) / 100;
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
    let incrementBtn = document.querySelector('#item__increment-btn' + item.id);
    let decrementBtn = document.querySelector('#item__decrement-btn' + item.id);
    if (item.quantity > 99){
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
      itemTotal = Math.round((itemTotal * 100) / 100);
      itemTotal = itemTotal.toFixed(2);
    }
    
    let menuCounts = document.querySelectorAll('#menu__count' + key);
    for (let menuCount of menuCounts){
     menuCount.innerText = '$' + itemCount;
    }

    let itemTotals = document.querySelectorAll('#item__total' + key);
    for (let itemTotal of itemTotals){
     itemTotal.innerText = '$' + itemTotal;
    }
  }
}

function populateCartContents(){
  let cartContents = document.querySelector('#cart-contents');
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
      text.textContent = LOOKUP_ITEM.name + ' ' + 
      LOOKUP_ITEM.weight + ' ' + LOOKUP_ITEM.price;
    let totalPrice = document.createElement('span');
      totalPrice.classList.add('item__total');
      totalPrice.id = 'item__total' + item.id;
    
    let menu = document.createElement('div');
      menu.classList.add('item__menu');
      menu.id = 'item__menu' + item.id;
    let incrementBtn = document.createElement('button');
      incrementBtn.classList.add('item__increment-btn');
      incrementBtn.id = 'item__increment-btn' + item.id;
    let decrementBtn = document.createElement('button');
      decrementBtn.classList.add('item__decrement-btn');
      decrementBtn.id = 'item__decrement-btn' + item.id;
    let menuCount = document.createElement('span');
      menuCount.id = 'menu__count' + item.id;
    menu.append(decrementBtn);
    menu.append(menuCount);
    menu.append(incrementBtn);

    let removeBtn = document.createElement('button');
      removeBtn.classList.add('item__remove-btn');
      removeBtn.id = 'item__remove-btn' + item.id;
    
    listItem.append(image);
    listItem.append(text);
    listItem.append(totalPrice);
    listItem.append(menu);
    listItem.append(removeBtn);

    listClone.append(listItem);
  }
  listClone.addEventListener('click', (event) => {
		const isButton = event.target.nodeName === 'BUTTON';
		if (isButton && event.target.classList.contains('item__increment-btn')){
			addToCart(event.target.id.slice(19));
		}
		if (isButton && event.target.classList.contains('item__decrement-btn')){
			removeFromCart(event.target.id.slice(19));
		}
		if (isButton && event.target.classList.contains('item__remove-btn')){
			removeFromCart(event.target.id.slice(16), true);
		}
	})

  list.parentNode.appendChild(listClone);
	list.remove();
}