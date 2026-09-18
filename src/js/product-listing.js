import {loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
//set the datasourse
const dataSourse = new ProductData();
//get the data for the product list
const element = document.querySelector(".product-list");
// set up the product list
const listing = new ProductList(category, dataSourse, element);
//
listing.init();