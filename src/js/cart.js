import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();
const cartItems = getLocalStorage("so-cart");

function renderCartContents() {
    if (cartItems !== null && cartItems.length > 0){
      const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
        let removeitembuttons = document.querySelectorAll('.removeitem')
        removeitembuttons.forEach( removeitem => {
          removeitem.addEventListener('click', () => removeProductfromCart(removeitem.dataset.id));
        });
    } else {
      const EmptyCart = document.createElement("p");
      const Emptycarttext = document.createTextNode("There are no items in your cart. Add some so you can buy some.");
      //add the text to the page
      EmptyCart.appendChild(Emptycarttext)
      document.querySelector(".products").appendChild(EmptyCart);
    }
}

function renderFinalprice() {
    if (cartItems !== null && cartItems.length > 0){
      var CaculatedPrice = 0
      for (var p=0; p < cartItems.length; p++){
          CaculatedPrice += parseInt(cartItems[p].FinalPrice);
      }
      const Pricedisplay = document.createElement("p");
      const Pricedisplaytxt = document.createTextNode("$" + CaculatedPrice);
      Pricedisplay.appendChild(Pricedisplaytxt)
      document.querySelector(".cart-total").appendChild(Pricedisplay);
    } 
    else {
      document.querySelector(".cart-footer.hide").remove();
    }
}



 function removeProductfromCart(productId) {
   let tempcartItems = getLocalStorage("so-cart") || [];
   tempcartItems.splice(productId,1) 
   setLocalStorage("so-cart", tempcartItems);
   location.reload();
}

function cartItemTemplate(item, id) {
  const newItem = `<li class="cart-card divider">
  <span class="removeitem" data-id="${id}"> Remove </span>
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
renderFinalprice();