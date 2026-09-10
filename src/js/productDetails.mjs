import { setLocalStorage, getParam } from "./utils.mjs";

export default class productdetails {
 constructor(productId, dataSource){
   this.productId = productId;
   this.product = {};
   this.dataSource = dataSource;
 }

 async init() {
 // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
 this.product = await this.dataSource.findProductById(this.productId);
 // the product details are needed before rendering the HTML
 this.renderproductdetails();
 // once the HTML is rendered, add a listener to the Add to Cart button
 // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
     document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }


  addProductToCart(product) {
   const cartItems = getLocalStorage("so-cart") || [];
   cartItems.push(product);
   setLocalStorage("so-cart", cartItems);
 }

  renderProductDetails() {
     productDetailstemplate(this.Product);
 }
}

function productDetailstemplate(product){
    document.querySelector('h2').textcontent = product.Brand.Name;
    document.querySelector('h2').textcontent = product.NameWithoutBrand;

    const productImage = document.getElementById('productimage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementByID('product-card__price').textcontent = product.FinalPrice;
    document.getElementByID('product__color').textcontent = product.Colors[0].ColorName;
    document.getElementByID('product_description').textcontent = product.DescriptionHtmlSimple;

    document.getElementByID('addToCart').data.id = product.Id;
}