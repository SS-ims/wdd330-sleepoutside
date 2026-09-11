import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=">
      <img src="" alt="Image of ">
      <h2 class="card__brand"></h2>
      <h3 class="card__name"></h3>
      <p class="product-card__price">$</p>
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