const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll(".card .btn");

const carritoObjeto = [];
const agregarAlCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
  };

  const indice = carritoObjeto.findIndex((item) => {
    return item.id === producto.id;
  });

  if (indice < 0) {
    carritoObjeto.push(producto);
  } else {
    carritoObjeto[indice].cantidad++;
  }

  pintarCarrito(carritoObjeto);
};

const pintarCarrito = (array) => {
  carrito.textContent = "";

  array.forEach((item) => {
    const clone = template.content.firstElementChild.cloneNode(true);
    clone.querySelector(".lead").textContent = item.titulo;
    clone.querySelector(".badge").textContent = item.cantidad;

    fragment.appendChild(clone);
  });

  carrito.appendChild(fragment);
};

btns.forEach((btn) => {
  btn.addEventListener("click", agregarAlCarrito);
});
