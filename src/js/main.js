import ProductData from "./ProductData.mjs";
import ProductList from "./Productlist.mjs";

//set the datasourse
const dataSourse = new ProductData("tents");
//get the data for the product list
const element = document.querySelector(".product-list")
// set up the product list
const ProductList = new ProductList("Tents", dataSourse, element)
//
ProductList.init();