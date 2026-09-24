import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}


function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  // An Array.map would be perfect for this process.
    const simplifieditems = items.map((item) => {
    console.log(item);
    return {
        item: item.id,
        price: item.FinalPrice,
        name: item.name,
        quantity: 1,
        }
    })
    return simplifieditems
}


export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    let Calculatedprice = 0
      for (var p=0; p < this.list.length; p++){
          Calculatedprice += parseFloat(this.list[p].FinalPrice);
      }
      return Calculatedprice;
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.itemTotal =   this.calculateItemSubTotal()
    this.tax = (this.itemTotal *.06)
    this.shipping = 10 + (this.list.length -1) *2;
    this.orderTotal = (
        this.itemTotal +
        this.tax +
        this.shipping
    )

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const subtotalElement = document.querySelector(`${this.outputSelector} #Subtotal`);
    const TaxElement  = document.querySelector(`${this.outputSelector} #Tax`);
    const shippingElement  = document.querySelector(`${this.outputSelector} #Shipping_Estimate`);
    const orderTotalElement  = document.querySelector(`${this.outputSelector} #Order_Total`);

    subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    TaxElement.innerText = `$${this.tax.toFixed(2)}`;
    shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotalElement.v = `$${this.orderTotal.toFixed(2)}`;

  }
  async checkout() {
  // get the form element data by the form name
  // convert the form data to a JSON order object using the formDataToJSON function
  // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
  // call the checkout method in the ExternalServices module and send it the JSON order data.
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    try {
        const response = await services.checkout(order);
        console.log(response);
    } catch (err) {
        console.log(err);
    }

  }
}
