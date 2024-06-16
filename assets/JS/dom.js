const INCOMPLETE_BOOKSHELFLIST = "uncompletedList";
const COMPLETE_BOOKSHELFLIST = "completedList";
const BOOK_ITEMID = "itemId";

function addBook() {
  const incompleteBookshelfList = document.getElementById(
    INCOMPLETE_BOOKSHELFLIST
  );
  const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELFLIST);

  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = parseInt(
    document.getElementById("inputBookYear").value,
    10
  );
  const inputBookIsComplete = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const book = makeBook(
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    inputBookIsComplete
  );
  const bookObject = composebookObject(
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    inputBookIsComplete
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (inputBookIsComplete == false) {
    incompleteBookshelfList.append(book);
  } else {
    completeBookshelfList.append(book);
  }

  updateDataToStorage();
}

function makeBook(
  inputBookTitle,
  inputBookAuthor,
  inputBookYear,
  inputBookIsComplete
) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = inputBookTitle;
  bookTitle.classList.add("move");

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = inputBookAuthor;

  const bookYear = document.createElement("p");
  bookYear.classList.add("year");
  bookYear.innerText = inputBookYear;

  const bookIsComplete = createCompleteButton();

  const bookRemove = createRemoveButton();
  bookRemove.innerText = "Hapus";

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");
  if (inputBookIsComplete == true) {
    bookIsComplete.innerText = "Belum selesai";
  } else {
    bookIsComplete.innerText = "Sudah selesai";
  }

  bookAction.append(bookIsComplete, bookRemove);
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");
  bookItem.append(bookTitle, bookAuthor, bookYear, bookAction);

  return bookItem;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createCompleteButton() {
  return createButton("green", function (event) {
    const parent = event.target.parentElement;
    addBookToCompleted(parent.parentElement);
  });
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  if (window.confirm("Apakah anda ingin menghapus buku ini?")) {
    books.splice(bookPosition, 1);
    bookElement.remove();
  }
  updateDataToStorage();
}

function createRemoveButton() {
  return createButton("red", function (event) {
    const parent = event.target.parentElement;
    removeBook(parent.parentElement);
  });
}

function addBookToCompleted(bookElement) {
  const bookTitled = bookElement.querySelector(".book_item h3").innerText;
  const bookAuthored = bookElement.querySelector(".book_item p").innerText;
  const bookYeared = parseInt(bookElement.querySelector(".year").innerText);
  const bookIsComplete = bookElement.querySelector(".green").innerText;

  if (bookIsComplete == "Sudah selesai") {
    const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const completeBookshelfList = document.getElementById(
      COMPLETE_BOOKSHELFLIST
    );
    completeBookshelfList.append(newBook);
  } else {
    const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    const incompleteBookshelfList = document.getElementById(
      INCOMPLETE_BOOKSHELFLIST
    );
    incompleteBookshelfList.append(newBook);
  }
  bookElement.remove();

  updateDataToStorage();
}

function refreshDataFromBooks() {
  const listUnCompleted = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
  const listCompleted = document.getElementById(COMPLETE_BOOKSHELFLIST);

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted == false) {
      listUnCompleted.append(newBook);
    } else {
      listCompleted.append(newBook);
    }
  }
}

function searchBook() {
  const inputSearch = document
    .getElementById("search-title")
    .value.toLowerCase();
  const bookItems = document.querySelectorAll(".book_item");

  for (const bookItem of bookItems) {
    const bookTitle = bookItem.querySelector("h3").innerText.toLowerCase();
    if (!bookTitle.includes(inputSearch)) {
      bookItem.style.display = "none";
    } else {
      bookItem.style.display = "";
    }
  }
}
