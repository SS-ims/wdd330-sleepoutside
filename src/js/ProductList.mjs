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


export default class ProductList  {
    constructor (category, dataSource, listElement) {
        //paramaters the constructor receaves
        this.category  = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        //makes data source return and await being resoloved
        const list = await this.dataSource.getData(this.category);
        //render the list next
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }


    renderList(list) {
        //renders the list with template
       renderListWithTemplate(productCardTemplate, this.listElement, list); 
    }
}