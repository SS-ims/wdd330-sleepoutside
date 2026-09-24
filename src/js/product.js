import { getParam } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./productDetails.mjs"

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParam('product');

const product = new productDetails(productId, dataSource);
product.init();

// add to cart button event handler
//async function addToCartHandler(e) {
//  const product = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(product);
//}

// add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);

