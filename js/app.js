const alert = document.getElementById("section-alert");
const formulario = document.getElementById("formulario");
const sectionTODO = document.getElementById("section-TODO");
const templateTODO = document.getElementById("template-TODO");

let todos = [];

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  const data = new FormData(formulario);
  const [todo] = [...data.values()];
  if (!todo.trim()) {
    alert.classList.remove("d-none");
    return;
  }

  agregarTODO(todo);
});

const agregarTODO = (todo) => {
  const objetoTODO = {
    nombre: todo,
    id: `${Date.now()}`,
  };

  todos.push(objetoTODO);

  pintarTODO();
};

const pintarTODO = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  sectionTODO.textContent = "";
  const fragment = document.createDocumentFragment();

  todos.forEach((item) => {
    const clone = templateTODO.content.cloneNode(true);
    clone.querySelector(".lead").textContent = item.nombre;

    clone.querySelector(".btn").dataset.id = item.id;

    fragment.appendChild(clone);
  });

  sectionTODO.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.id !== e.target.dataset.id);
    pintarTODO();
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    pintarTODO();
  }
});
