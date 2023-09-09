//
const url = 'https://course-api.com/javascript-store-products';
const productsContainer = document.querySelector('.products-container');

const fetchProduct = async () => {
  productsContainer.innerHTML = `<h3>loading. . .</h3>`;
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error('Error in link');
    }
    const data = await reponse.json();
    return data;
  } catch (error) {
    productsContainer.innerHTML = `<h3>Error in code</h3>`;
  }
};

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const { id, fields } = product;
      const { price, name: title, image } = fields;
      const { url: img } = image[0];
      const formatPrice = price / 100;
      return `<a href="product.html?id=${id}">
            <img src="${img}"
                class="product-img" alt="product-image">
            <footer>
                <h4 class="title">${title}</h4>
                <span class="price">$${formatPrice}</span>
            </footer>
        </a>`;
    })
    .join('');
  productsContainer.innerHTML = productList;
};

const start = async () => {
  const data = await fetchProduct();
  displayProducts(data);
};

start();
