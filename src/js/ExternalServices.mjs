const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(res) {
  const jsonRes =  await res.json();
  if (res.ok) {
    return res.json();
  } throw {
    name: "servicesError",
    message: jsonRes,
  }
}

export default class ExternalServices {
  constructor() {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }

async getData(term, type) {
  if (type=='search'){
  const response = await fetch(`${baseURL}products`);
  const termlower = term.toLowerCase()
  const data = await convertToJson(response);
  const filteredresponse = data.filter(r => r.Name.toLowerCase().includes(termlower) || r.DescriptionHtmlSimple.toLowerCase().includes(termlower)) 

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
    async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }

}

