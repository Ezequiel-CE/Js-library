// FUNCION CONTRUCTORA

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  //metodos
  this.info = function () {
    return `${title} by ${author}, ${pages} ,${read}`;
  };
};

//CREACION DEL OBJETO LITERAL CON EL USO DE LA KEYWORD NEW

const theHobbit = new Book("The Hobbit", "J.R.R", "295 pages", "not read yet");

console.log(theHobbit.constructor);
console.log(theHobbit.info());
