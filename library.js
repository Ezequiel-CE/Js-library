let myLibrary = [];
let number_box = 0;

//funcion costructora

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.number = number_box++;
  this.toggleRead = function () {
    if (this.read) {
      this.read = false;
    } else {
      this.read = true;
    }
  };
};

//
//elementos

const formBtn = document.getElementById("add-box-btn");
const form = document.getElementById("form");
const booksContainer = document.querySelector(".books-container");

const createElement = (bookObj) => {
  //     <div class="book-el" >
  //       <p class="title-el">The Hobbit</p>
  //       <p class="author-el">J.R.R</p>
  //       <p class="pages-el">26 pages</p>
  //       <button class="read-el" >read</button>
  //       <button class="delete-el">Delete book</button>
  //create a bock component
  const div = document.createElement("div");
  div.classList.add("book-el");

  const titleP = document.createElement("p");
  titleP.textContent = bookObj.title;
  const authorP = document.createElement("p");
  authorP.textContent = bookObj.author;
  const pagesP = document.createElement("p");
  pagesP.textContent = bookObj.pages;
  const readbtn = document.createElement("button");
  readbtn.textContent = bookObj.read ? "READ" : "NOT READ";
  readbtn.classList.add("read-el");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-el");
  deleteBtn.textContent = "Delete Book";

  div.appendChild(titleP);
  div.appendChild(authorP);
  div.appendChild(pagesP);
  div.appendChild(readbtn);
  div.appendChild(deleteBtn);

  //crea el evento borrar

  deleteBtn.addEventListener("click", () => {
    const indexEl = myLibrary.findIndex(
      (book) => book.number === bookObj.number
    );
    //elimina el el y modifica el array
    myLibrary.splice(indexEl, 1);
    booksContainer.removeChild(div);
  });
  //cambia el estado del read
  readbtn.addEventListener("click", () => {
    bookObj.toggleRead();
    readbtn.textContent = bookObj.read ? "READ" : "NOT READ";
  });

  booksContainer.appendChild(div);
};

//crea el objeto y lo mete en el array
const addBookToLibrary = (title, author, pages, read) => {
  const libraryBook = new Book(title, author, pages, read);

  myLibrary.push(libraryBook);

  //crea elemento con el nuevo objeto
  createElement(libraryBook);
};

//crea el elemento

//obtiene la informacion de la data
const getBookData = (e) => {
  e.preventDefault();

  //form data
  const titleData = document.getElementById("title-book").value;
  const authorData = document.getElementById("author-book").value;
  const pagesData = document.getElementById("pages-book").value;
  const readData = document.getElementById("read-book").checked;

  addBookToLibrary(titleData, authorData, pagesData, readData);

  form.reset();
};

// code
form.addEventListener("submit", getBookData);

addBookToLibrary("The hobbit", "J.R.R", 256, true);
addBookToLibrary("test", "ss", 25, false);
addBookToLibrary("tes 2", "ss", 25, false);

///// test
console.log(myLibrary);
