//
const url = 'https://course-api.com/javascript-store-single-product';

const singleProdContainer = document.querySelector('.single-product-container');

const fetchSingleProduct = async () => {
  singleProdContainer.innerHTML = `<h3>loading...</h3>`;
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const response = await fetch(`${url}?id=${id}`);
    if (!response.ok) {
      throw new Error('Error in link');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    singleProdContainer.innerHTML = `<h3>Error...</h3>`;
  }
};

const displayProduct = (product) => {
  const {
    company,
    colors,
    price,
    name: title,
    description,
    image,
  } = product.fields;
  const { url: img } = image[0];
  const formatPrice = price / 100;
  const colorList = colors
    .map((color) => {
      return `<div class="color" style="background-color:${color};"></div>`;
    })
    .join('');
  singleProdContainer.innerHTML = `<img src="${img}"
            class="single-product-img">
        <div class="single-product-footer">
            <h2>${title}</h2>
            <h3>${company}</h3>
            <h4>$${formatPrice}</h4>
            <div class="colors">
                ${colorList}
            </div>
            <p>${description}</p>
            <button class="btn">add to cart</button>
        </div>`;
};

const start = async () => {
  const data = await fetchSingleProduct();
  displayProduct(data);
};

start();
