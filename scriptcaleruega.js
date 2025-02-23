document.addEventListener("DOMContentLoaded", function() {
  cargarAnuncios();
});

function cargarProducto(id) {

  fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("thumbnail").src = data.thumbnail;
      document.getElementById("title").textContent = data.title;
      document.getElementById("description").textContent = data.description;
      document.getElementById("price").textContent = data.price;
      document.getElementById("discountPercentage").textContent = data.discountPercentage;
      document.getElementById("rating").textContent = data.rating;
      document.getElementById("stock").textContent = data.stock;
      document.getElementById("brand").textContent = data.brand;
      document.getElementById("category").textContent = data.category;
    })
    .catch(error => console.error("Error al obtener los datos del producto:", error));
}


function cargarAnuncios() {
  const adsContainer = document.getElementById("ads-container");
  adsContainer.innerHTML = ''; // limpiar anuncios anteriores

  const n = 4; // Cantidad de anuncios a mostrar
  const ids = new Set();

  // n Ids aleatorios
  while (ids.size < n) {
    const randomId = Math.floor(Math.random() * 150) + 1;
    ids.add(randomId);
  }

   // recorremos los ids y hacemos una petición por cada uno
  ids.forEach(id => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(product => {
        const adElement = document.createElement("a");
        adElement.href = `anuncio.html?id=${id}`;
        adElement.classList.add("ad");

        adElement.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p><strong>Precio:</strong> ${product.price}$</p>
          <p><strong>Descuento:</strong> ${product.discountPercentage}%</p>
        `;

        adsContainer.appendChild(adElement);
      })
      .catch(error => console.error(`Error al cargar el producto ${id}:`, error));
    });
}
