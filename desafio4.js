const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async createIfNotExists() {
    let file;
    try {
      file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return file;
    } catch (error) {
      if (error.code == "ENOENT") {
        await fs.promises.writeFile(this.nombreArchivo, "[]");
        file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      } else {
        console.log(error);
      }
    }
    return file;
  }

  async save(objeto) {
    let file = await contenedor1.createIfNotExists();
    let parsedFile = JSON.parse(file);
    if (parsedFile.length > 0) {
      objeto.id = parsedFile.length + 1;
      parsedFile.push(objeto);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(parsedFile)
      );
    } else {
      objeto.id = 1;
      parsedFile.push(objeto);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(parsedFile)
      );
    }
    return objeto.id;
  }

  async getById(number) {
    // Leemos el archivo
    const file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
    // Lo transformamos a un objeto de javascript(array)
    const parsedFile = JSON.parse(file);
    // Con el metodo filter, creamos un nuevo array con el objeto que tenga el mismo id que le pasamos
    const result = parsedFile.filter((obj) => obj.id == number);
    // Devolvemos el primer indice del array, que seria el objeto que encontramos
    if (result) {
      return result[0];
    } else {
      return null;
    }
  }

  async getAll() {
    // Guardo el valor del metodo auxiliar
    await contenedor1.createIfNotExists();
    const txt = await fs.promises.readFile(this.nombreArchivo, "utf-8");
    // Los transformo a un objeto de js para mostrarlos mejor
    return JSON.parse(txt);
  }

  async deleteById(id) {
    // Guardo el valor del metodo auxiliar
    let file = await contenedor1.createIfNotExists();
    // Lo transformo a un objeto de javascript (actualmente es un archivo de texto plano, o sea, un string)
    let parsedFile = JSON.parse(file);
    // Devuelvo un nuevo array, esta vez con todos los objetos, MENOS el que tenga un id igual al que le paso por parametro
    const result = parsedFile.filter((obj) => obj.id != id);
    // Reescribo el archivo con ese nuevo array transformado devuelta a string
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(result));
    return result;
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile("./producto.txt", "[]");
      return "[]";
    } catch (error) {
      console.log(error.mesage);
    }
  }
}



const producto = {
  nombre: "Pelota",
  precio: 500,
};
const producto1 = {
  nombre: "zapatilla",
  precio: 500,
};
const producto2 = {
  nombre: "remera",
  precio: 500,
};



const contenedor1 = new Contenedor("./producto.txt");
contenedor1.save(producto);
const contenedor2 = new Contenedor("./producto.txt");
//contenedor2.save(producto1);
const contenedor3 = new Contenedor("./producto.txt");
//contenedor3.save(producto2);

//contenedor1.getAll();
//console.log(contenedor1.getAll());

//contenedor1.deleteById(5);
//console.log(contenedor1.deleteById());

//contenedor1.deleteAll();
//console.log(contenedor1.deleteAll());



