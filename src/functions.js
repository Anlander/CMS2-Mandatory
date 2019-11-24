

function getFilter (urlArray) {
  let newUrl = [];
  if (urlArray.length > 1) {
        urlArray.map((url, i) => {
      if (i === 0) {
        return newUrl.push(url.replace("&", "?"));
      } else {
        return newUrl.push(url.replace("?", "&"))
      }
    })
  } else {
    urlArray.map((path, i) => {
      if (i === 0) {
        return newUrl.push(path.replace('&', '?'));
      } else {
        return newUrl.push(path.replace('?', '&'))
      }
    })
  }
  return newUrl.join("");
}
module.exports.getFilter = getFilter;

function addToCart(product) {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
  productsInCart.push(product);
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
};
module.exports.addToCart = addToCart;

function getUnique(li) {
  let hash = {}
  li.forEach((val) => {
    const id = val.id;
    if (hash[id]) {
      hash[id].amount = hash[id].amount + 1
    } else {
      val.amount = 1
      hash[id] = val;
    }
    console.log(li);
  })
  return Object.values(hash)

}
module.exports.getUnique = getUnique;
