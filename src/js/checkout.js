import CheckoutProcess from "./checkoutprocess.mjs";
import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

const order = new  CheckoutProcess ("so-cart",".checkout-summary");
order.init();

document
  .querySelector("#ZipCode")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

  document.querySelector("#submitorder").addEventListener("click", (e) => {
  e.preventDefault();

  order.checkout();
});