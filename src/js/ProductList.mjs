import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name} ">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <p class="product-card__price">${product.FinalPrice}$</p>
    </a>
  </li>`;
}

function noresult (element){
          const NoResults = document.createElement("p");
          const NoResultsText = document.createTextNode("There are no results");
          //add the text to the page
          NoResults.appendChild(NoResultsText)
          element.appendChild(NoResults);
}

export default class ProductList  {
    constructor (input, dataSource, listElement, type) {
        //paramaters the constructor receaves
        this.input  = input;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.type = type;
    }

    async init() {
        const list = await this.dataSource.getData(this.input, this.type);
        //makes data source return and await being resoloved
        //render the list next
        this.renderList(list);
        document.querySelector(".title").textContent = this.input;
    }


    renderList(list) {
        //renders the list with template
        if (list !== "No products found" && list !== "{}" && typeof list !== "undefined" && list.length !== 0){
          renderListWithTemplate(productCardTemplate, this.listElement, list); 
          console.log(list)
        } else {
        noresult(this.listElement);
        };
    }
}
