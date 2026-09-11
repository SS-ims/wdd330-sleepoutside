import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
   const cartItems = getLocalStorage("so-cart");
    if (cartItems !== null && cartItems.length > 0){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    }
    else{
      const EmptyCart = document.createElement("p");
      const Emptycarttext = document.createTextNode("There are no items in your cart. Add some so you can buy some.");
      //add the text to the page
      EmptyCart.appendChild(Emptycarttext)
      document.querySelector(".products").appendChild(EmptyCart);
    }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
