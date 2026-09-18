const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(term, type) {
  if (type=='search'){
  const response = await fetch(`${baseURL}products`);

  const data = await convertToJson(response);
  const filteredresponse = data.filter(r => r.Name.includes(term) || r.DescriptionHtmlSimple.includes(term)) 

  return filteredresponse;

  }
  else{
  const response = await fetch(`${baseURL}products/search/${term}`);

  const data = await convertToJson(response);

  return data.Result;

  }
}

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result)
    return data.Result;
  }
}
