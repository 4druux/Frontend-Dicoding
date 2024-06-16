document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");

  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const searchBooks = document.getElementById("searchBook");

  searchBooks.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

function changeText() {
  const checkbox = document.getElementById("inputBookIsComplete");
  const textsubmit = document.getElementById("textsubmit");

  if (checkbox.checked == true) {
    textsubmit.innerText = "Sudah selesai dibaca";
  } else {
    textsubmit.innerText = "Belum selesai dibaca";
  }
}
