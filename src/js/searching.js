import {loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const search = getParam("search");
//set the datasourse
const dataSourse = new ExternalServices();
//get the data for the product list
const element = document.querySelector(".product-list");
// set up the product list
const listing = new ProductList(search, dataSourse, element, 'search');
//
listing.init();