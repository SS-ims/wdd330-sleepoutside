import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name} ">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <p class="product-card__price">${product.FinalPrice}$</p>
    </a>
  </li>`
}


export default class ProductList  {
    constructor (category, dataSource, listEmement) {
        //paramaters the constructor receaves
        this.ProducCategory = category;
        this.dataSource = dataSource;
        this.listEmement = listEmement;
    }

    async init() {
        //makes data source return and await being resoloved
        const list = await this.dataSource.getData();

        //render the list next
        this.renderList(list);
    }


    renderList(list) {
        //renders the list with template
       renderListWithTemplate(productCardTemplate, this.listEmement, list); 
    }
}