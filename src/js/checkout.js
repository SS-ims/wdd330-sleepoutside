import CheckoutProcess from "./checkoutprocess.mjs";
import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

const order = new  CheckoutProcess ("so-cart",".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

  document.forms.checkout.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      order.checkout();
    } else {
      event.currentTarget.reportValidity();
    }
  })

