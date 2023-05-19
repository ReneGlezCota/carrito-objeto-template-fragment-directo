const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template-footer");
const fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-outline-primary")) {
    agregarAlCarrito(e);
  }

  if (e.target.matches("#carrito .list-group-item .btn-success")) {
    btnAgregar(e);
  }
  if (e.target.matches("#carrito .list-group-item .btn-danger")) {
    btnQuitar(e);
  }
});

let carritoObjeto = [];

const agregarAlCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    precio: parseInt(e.target.dataset.precio),
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

  pintarCarrito();
};

const pintarCarrito = () => {
  carrito.textContent = "";

  carritoObjeto.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".text-white .lead").textContent = item.titulo;
    clone.querySelector(".badge").textContent = item.cantidad;
    clone.querySelector("div .lead span").textContent =
      item.precio * item.cantidad;

    clone.querySelector(".btn-danger").dataset.id = item.id;
    clone.querySelector(".btn-success").dataset.id = item.id;

    fragment.appendChild(clone);
  });

  carrito.appendChild(fragment);
  pintarFooter();
};

const pintarFooter = () => {
  footer.textContent = "";

  const total = carritoObjeto.reduce(
    (acc, current) => acc + current.cantidad * current.precio,
    0
  );

  if (total > 0) {
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("span").textContent = total;
    footer.appendChild(clone);
  }
};

const btnAgregar = (e) => {
  carritoObjeto = carritoObjeto.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });

  pintarCarrito();
};

const btnQuitar = (e) => {
  carritoObjeto = carritoObjeto.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });
  pintarCarrito();
};
