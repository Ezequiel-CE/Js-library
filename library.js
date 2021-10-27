let myLibrary = [];
let number_box = 0;

//clase para crear libro

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.number = number_box;
  }
  toggleRead() {
    if (this.read) {
      this.read = !this.read;
    } else {
      this.read = !this.read;
    }
  }
}

const formBtn = document.getElementById("add-box-btn");
const form = document.getElementById("form");
const booksContainer = document.querySelector(".books-container");

const createElement = (bookObj) => {
  const div = document.createElement("div");
  div.classList.add("book-el");

  const titleP = document.createElement("p");
  titleP.textContent = bookObj.title;
  const authorP = document.createElement("p");
  authorP.textContent = bookObj.author;
  const pagesP = document.createElement("p");
  pagesP.textContent = `${bookObj.pages} pages`;
  const readbtn = document.createElement("button");
  readbtn.textContent = bookObj.read ? "READ" : "NOT READ";
  readbtn.classList.add("read-el");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-el");
  deleteBtn.textContent = "DELETE";

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
    //actualiza el store
    addToStorage(myLibrary);
    booksContainer.removeChild(div);
  });
  //cambia el estado del read
  readbtn.addEventListener("click", () => {
    bookObj.toggleRead();
    readbtn.textContent = bookObj.read ? "READ" : "NOT READ";
    //actualiza
    addToStorage(myLibrary);
  });

  booksContainer.appendChild(div);
};

//crea el objeto y lo mete en el array
const addBookToLibrary = (title, author, pages, read) => {
  const libraryBook = new Book(title, author, pages, read);

  myLibrary.push(libraryBook);

  //crea elemento con el nuevo objeto
  createElement(libraryBook);

  //agrega y actualiza el local storage
  addToStorage(myLibrary);
};

//crea el elemento

//obtiene la informacion de la data
const getBookDataForm = (e) => {
  e.preventDefault();

  //form data
  const titleData = document.getElementById("title-book").value;
  const authorData = document.getElementById("author-book").value;
  const pagesData = document.getElementById("pages-book").value;
  const readData = document.getElementById("read-book").checked;

  addBookToLibrary(titleData, authorData, pagesData, readData);

  form.reset();
};

const lookForStorage = () => {
  if (localStorage.getItem("library")) {
    const storageLibrary = JSON.parse(localStorage.getItem("library"));
    storageLibrary.forEach((book) => {
      addBookToLibrary(book.title, book.author, book.pages, book.read);
    });
  } else {
    console.log("no existe");
  }
};

const addToStorage = (lib) => {
  localStorage.setItem("library", JSON.stringify(lib));
};

// code
form.addEventListener("submit", getBookDataForm);

lookForStorage();
