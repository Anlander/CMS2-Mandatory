let API = 'http://localhost:8080/';
const getProducts = (sortUrl) => {
  if (!sortUrl) {
    sortUrl = "";
  }
  return fetch(`${API}api/collections/get/Products${sortUrl}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(product => product.json())
  .then(product => product)
};
export default getProducts;
