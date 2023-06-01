//Funcion IIFE

// (() => {
//   const fruta = "🍌";
//   console.log(fruta);
// })();

// const sandia = "🍉";
// export default sandia;

export default function () {
  console.log("🍌");
}

const fresa = () => {
  console.log("🍓");
};

class Fruta {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

export { fresa, Fruta };
