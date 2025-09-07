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
}

function emptyCart(){
  cart = [];
}

function updateCart(){
 localStorage.setItem('cart', JSON.stringify(cart)); 
 updateCartCountTotal();
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
    let addToCartBtn = document.querySelector('#add-to-cart-btn' + item.id);
    let incrementBtn = document.querySelector('#increment-cart-item-btn' + item.id);
    let decrementBtn = document.querySelector('#decrement-cart-item-btn' + item.id);
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
  // TODO: item total count (sum * item.quantity)
  //...
  
}

updateCart()