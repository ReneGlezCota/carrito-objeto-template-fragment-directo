const formulario = document.getElementById("formulario");
const cardsEstudiante = document.getElementById("cardsEstudiante");
const cardsProfesor = document.getElementById("cardsProfesor");
const templateEstudiante = document.getElementById("template-estudiante");
const templateProfesor = document.getElementById("template-profesor");

const estudiantes = [];
const profesores = [];
let idGlobal = 0;
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);
  const [nombre, edad, opcion] = [...datos.values()];
  const id = generateId(idGlobal);

  if (opcion === "Estudiante") {
    const estudiante = new Estudiante(id, nombre, edad);

    estudiantes.push(estudiante);
    Persona.pintarPersonaUI(estudiantes, opcion);
  } else if (opcion === "Profesor") {
    const profesor = new Profesor(id, nombre, edad);

    profesores.push(profesor);
    Persona.pintarPersonaUI(profesores, opcion);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    if (e.target.matches(".btn-success")) {
      estudiantes.map((item) => {
        if (item.id === parseInt(e.target.dataset.id)) {
          item.setEstado = true;
        }

        return item;
      });
    }
    if (e.target.matches(".btn-danger")) {
      estudiantes.map((item) => {
        if (item.id === parseInt(e.target.dataset.id)) {
          item.setEstado = false;
        }
        return item;
      });
    }

    Persona.pintarPersonaUI(estudiantes, "Estudiante");
  }
});

class Persona {
  constructor(id, nombre, edad) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
  }

  static pintarPersonaUI(personas, tipo) {
    if (tipo === "Estudiante") {
      cardsEstudiante.textContent = "";
      const fragment = document.createDocumentFragment();

      personas.forEach((item) => {
        fragment.appendChild(item.agregarEstudiante());
      });

      cardsEstudiante.appendChild(fragment);
    } else if (tipo === "Profesor") {
      cardsProfesor.textContent = "";
      const fragment = document.createDocumentFragment();

      personas.forEach((item) => {
        fragment.appendChild(item.agregarProfesor());
      });

      cardsProfesor.appendChild(fragment);
    }
  }
}

class Estudiante extends Persona {
  #estado = false;
  #estudiante = "Estudiante";

  /**
   * @param {boolean} estado
   */
  set setEstado(estado) {
    this.#estado = estado;
    return this.#estado;
  }

  get getEstudiante() {
    return this.#estudiante;
  }

  agregarEstudiante() {
    const clone = templateEstudiante.content.cloneNode(true);

    clone.querySelector("h5 .text-primary").textContent = this.nombre;
    clone.querySelector("h6").textContent = this.getEstudiante;
    clone.querySelector(".lead").textContent = this.edad;

    if (this.#estado) {
      clone.querySelector(".badge").className = "badge bg-success";
      clone.querySelector(".btn-success").disabled = true;
      clone.querySelector(".btn-danger").disabled = false;
    } else {
      clone.querySelector(".badge").className = "badge bg-danger";
      clone.querySelector(".btn-danger").disabled = true;
      clone.querySelector(".btn-success").disabled = false;
    }

    clone.querySelector(".badge").textContent = this.#estado
      ? "Aprobado"
      : "Reprobado";

    clone.querySelector(".btn-success").dataset.id = this.id;
    clone.querySelector(".btn-danger").dataset.id = this.id;
    return clone;
  }
}

class Profesor extends Persona {
  #profesor = "Profesor";

  agregarProfesor() {
    const clone = templateProfesor.content.cloneNode(true);

    clone.querySelector("h5").textContent = this.nombre;
    clone.querySelector("h6").textContent = this.#profesor;
    clone.querySelector(".lead").textContent = this.edad;

    return clone;
  }
}

function generateId(id) {
  idGlobal += 1;
  return idGlobal;
  // return Math.floor(Math.random() * id) + 1;
}
