import { getLocalStorage } from "./utils.mjs";

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
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    var CaculatedPrice = 0
      for (var p=0; p < this.list.length; p++){
          CaculatedPrice += parseInt(this.list[p].FinalPrice);
      }
      return CaculatedPrice;
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.itemTotal = calculateItemSubTotal()
    this.tax = (this.itemTotal *.06)
    this.shipping = 10 + (this.list.length -1) *2;
    this.orderTotal = (
        parseFloat(this.itemTotal)+
        parseFloat(this.tax) +
        parsefloat(this.shipping)
    )

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);


    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}
